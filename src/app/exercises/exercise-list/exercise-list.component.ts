import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from 'src/app/shared/models/course.model';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { ExerciseTopicService } from 'src/app/shared/services/exercise-topic.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
})
export class ExerciseListComponent implements OnInit {
  @Input() editable = false;

  exerciseTopicList!: ExerciseTopic[];


  courseList: Course[] = [];
  courseListForSelectedType: Course[] = [];

  sortForm!: FormGroup;

  courseTypeEnum = CourseType;


  constructor(
    private formBuilder: FormBuilder,
    private exerciseTopicService: ExerciseTopicService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.sortForm = this.formBuilder.group({
      courseType: CourseType.undefined,
      course: undefined,
      sort: 'dateDesc',
    });

    this.courseService.getCourses().subscribe((data) => {
      this.courseList = data;
      this.updateCourseList();
    });
    
    this.sortForm.valueChanges.subscribe(() => {
      this.exerciseTopicList = [];
      this.fetchExerciseTopics();
      console.log(this.sortForm.value);
    });
    
    this.sortForm.get('courseType')?.valueChanges.subscribe(() => {
      this.updateCourseList();
      this.sortForm.get('course')?.setValue(undefined);
    });

    

    this.fetchExerciseTopics();

    
  }

  fetchExerciseTopics(): void {
    this.exerciseTopicService.getExerciseTopicList().subscribe((data) => {
      return (this.exerciseTopicList = data.filter(
        (et) => et.exerciseCount > 0
      ));
    });
  }

  updateCourseList(): void {
    this.courseListForSelectedType = this.courseList.filter(
      (course) => course.type === this.sortForm.get('courseType')?.value
    );
  }
}
