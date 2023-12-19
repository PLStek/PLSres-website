import { CoursesService } from './../../shared/services/courses.service';
import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { Course } from 'src/app/shared/models/course.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';

@Component({
  selector: 'app-add-charbon',
  templateUrl: './add-charbon.component.html',
  styleUrls: ['./add-charbon.component.scss'],
})
export class AddCharbonComponent implements OnInit {
  newCharbon!: Charbon;
  dateInput: String = '2023';
  timeInput: String = '00:00';
  courseList: Course[] = [];
  courseListForSelectedType: Course[] = [];

  courseTypeEnum = CourseType;

  constructor(
    private charbonService: CharbonService,
    private courseService: CoursesService
  ) {}

  ngOnInit(): void {
    this.newCharbon = new Charbon(
      0,
      '',
      CourseType.undefined,
      new Date('2023'),
      '',
      [],
      ''
    );

    this.courseService.getCourses().subscribe((data) => {
      this.courseList = data;
    });
  }

  updateCourseListForType(): void {
    console.log(this.newCharbon.courseType);
    this.courseListForSelectedType = this.courseList.filter(
      (course) => course.type === this.newCharbon.courseType
    );
    this.newCharbon.course = "";
  }

  updateDate(): void {
    const newDate = this.dateInput + 'T' + this.timeInput;
    console.log(newDate);
    this.newCharbon.date = new Date(newDate);
  }

  addCharbon(): void {
    console.log(this.newCharbon);
  }
}
