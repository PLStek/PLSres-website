import { CharbonGetParameters } from './../../shared/models/charbon-get-parameters.model';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { Course } from 'src/app/shared/models/course.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';

@Component({
  selector: 'app-charbons-page',
  templateUrl: './charbons-page.component.html',
  styleUrls: ['./charbons-page.component.scss'],
})
export class CharbonsPageComponent implements OnInit {
  readonly CHARBON_PER_PAGE = 10;

  charbonList: Charbon[] = [];
  nextThreeCharbons: Charbon[] = [];
  selectedCharbon: Charbon | null = null;

  courseList: Course[] = [];
  courseListForSelectedType: Course[] = [];

  isLoading = false;
  fullyfetched = false;

  sortForm!: FormGroup;

  courseTypeEnum = CourseType;

  constructor(
    private charbonService: CharbonService,
    private formBuilder: FormBuilder,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.sortForm = this.formBuilder.group({
      courseType: CourseType.undefined,
      course: undefined,
    });

    this.fetchThreeUpcomingCharbons();

    this.courseService.getCourses().subscribe((data) => {
      this.courseList = data;
      this.updateCourseList();
    });

    this.sortForm.valueChanges.subscribe((data) => {
      this.charbonList = [];
      this.fullyfetched = false;
    });

    this.sortForm.get('courseType')?.valueChanges.subscribe((data) => {
      this.updateCourseList();
      this.sortForm.get('course')?.setValue(undefined);
    });
  }


  fetchThreeUpcomingCharbons(): void {
    this.charbonService
      .getCharbonList({ minDate: new Date(), limit: 3 })
      .subscribe((charbons) => {
        this.nextThreeCharbons = charbons;
      });
  }

  updateCourseList(): void {
    this.courseListForSelectedType = this.courseList.filter(
      (course) => course.type === this.sortForm.get('courseType')?.value
    );
  }

  fetchNextCharbons(): void {
    const offset: number = this.charbonList.length;
    const formData = this.sortForm.value;

    this.isLoading = true;

    const params: CharbonGetParameters = {
      courses: formData.course ? [formData.course] : undefined,
      courseType:
        formData.courseType === CourseType.undefined
          ? undefined
          : formData.courseType,
      limit: this.CHARBON_PER_PAGE,
      offset: offset,
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
        console.log('fetching next charbons');
        this.fetchNextCharbons();
      }
    }
  }

  handleSelectedCharbonChange(selectedCharbon: Charbon | null): void {
    this.selectedCharbon = selectedCharbon;
  }
}
