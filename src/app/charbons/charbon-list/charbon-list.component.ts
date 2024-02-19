import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import {
  CharbonGetParameters,
  CharbonSortOption,
} from 'src/app/shared/models/charbon-get-parameters.model';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { Course } from 'src/app/shared/models/course.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';
import { CharbonCardComponent } from '../charbon-card/charbon-card.component';

@Component({
  selector: 'app-charbon-list',
  templateUrl: './charbon-list.component.html',
  styleUrls: ['./charbon-list.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CharbonCardComponent],
})
export class CharbonListComponent implements OnInit {
  readonly CHARBON_PER_PAGE = 9;

  @Input() editable = false;

  charbonList: Charbon[] = [];

  courseList: Course[] = [];
  courseListForSelectedType: Course[] = [];

  isLoading = false;
  fullyfetched = false;

  sortForm!: FormGroup;

  courseTypeEnum = CourseType;
  charbonSortOption = CharbonSortOption;

  constructor(
    private charbonService: CharbonService,
    private formBuilder: FormBuilder,
    private courseService: CourseService
  ) {
    this.editable = false;
  }

  ngOnInit(): void {
    this.sortForm = this.formBuilder.group({
      courseType: new FormControl(CourseType.undefined),
      course: new FormControl(undefined),
      sort: new FormControl(CharbonSortOption.dateDesc),
    });

    this.courseService.getCourses().subscribe((data) => {
      this.courseList = data;
      this.updateCourseList();
    });

    this.sortForm.valueChanges.subscribe(() => {
      this.resetCharbons();
    });

    this.sortForm.get('courseType')?.valueChanges.subscribe(() => {
      this.updateCourseList();
      this.sortForm.get('course')?.setValue(undefined);
    });

    this.fetchNextCharbons();
  }

  resetCharbons(): void {
    this.charbonList = [];
    this.fullyfetched = false;
    if (!this.isLoading) {
      this.fetchNextCharbons();
    }
  }

  updateCourseList(): void {
    this.courseListForSelectedType = this.courseList.filter(
      (course) => course.type === this.sortForm.get('courseType')?.value
    );
  }

  fetchNextCharbons(): void {
    this.isLoading = true;

    const offset: number = this.charbonList.length;
    const formData = this.sortForm.value;

    const params: CharbonGetParameters = {
      course: formData.course ? [formData.course] : undefined,
      courseType:
        formData.courseType === CourseType.undefined
          ? undefined
          : formData.courseType,
      limit: this.CHARBON_PER_PAGE,
      offset: offset,
      sort: formData.sort,
    };

    this.charbonService.getCharbonList(params).subscribe((charbons) => {
      this.charbonList.push(...charbons);
      this.isLoading = false;
      if (charbons.length < this.CHARBON_PER_PAGE) {
        this.fullyfetched = true;
      }
    });
  }

  // Dynamic fetching of charbons
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // Check if the user has reached the bottom of the page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // Load more users when reaching the bottom
      if (!this.isLoading && !this.fullyfetched) {
        this.fetchNextCharbons();
      }
    }
  }
}
