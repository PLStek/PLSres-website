import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { CharbonSortOption } from 'src/app/shared/models/charbon-get-parameters.model';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { Course } from 'src/app/shared/models/course.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';
import { CharbonCardComponent } from '../charbon-card/charbon-card.component';
import { ToastrService } from 'ngx-toastr';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-charbon-list',
  templateUrl: './charbon-list.component.html',
  styleUrls: ['./charbon-list.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CharbonCardComponent, NgStyle],
})
export class CharbonListComponent implements OnInit {
  readonly CHARBON_PER_PAGE = 9;

  @Input() editable = false;

  charbonList: Charbon[] = [];

  courseList: Course[] = [];

  isLoading = false;

  sortForm!: FormGroup;

  charbonSortOption = CharbonSortOption;

  CourseType = CourseType;

  get courseListForSelectedType(): Course[] {
    return this.courseList.filter(
      (course) => course.type == this.sortForm.get('courseType')?.value
    );
  }

  constructor(
    private charbonService: CharbonService,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private toastr: ToastrService
  ) {
    this.editable = false;
  }

  ngOnInit(): void {
    this.sortForm = this.formBuilder.group({
      courseType: new FormControl(CourseType.undefined),
      course: new FormControl(''),
      sort: new FormControl(CharbonSortOption.dateDesc),
    });

    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courseList = data;
      },
      error: () => {
        this.toastr.error('Erreur lors de la récupération des cours', 'Erreur');
      },
    });

    this.sortForm.valueChanges.subscribe(() => {
      //TODO: sort charbons
    });

    this.sortForm.get('courseType')?.valueChanges.subscribe(() => {
      this.sortForm.patchValue({ course: '' });
    });

    this.fetchNextCharbons();
  }
  fetchNextCharbons(): void {
    this.isLoading = true;

    this.charbonService.getCharbons().subscribe({
      next: (charbons) => {
        this.charbonList = charbons;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error(
          'Erreur lors de la récupération des charbons',
          'Erreur'
        );
      },
    });
  }
}
