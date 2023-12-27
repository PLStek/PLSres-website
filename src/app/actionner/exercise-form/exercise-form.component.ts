import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { ExerciseTopicService } from 'src/app/shared/services/exercise-topic.service';
import { Course } from 'src/app/shared/models/course.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExercisePostParameters } from 'src/app/shared/models/exercise-post-parameters.model';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
})
export class AddExerciceComponent implements OnInit {
  form!: FormGroup;

  courseList: Course[] = [];
  courseListForSelectedType: Course[] = [];
  exerciseTopicList: ExerciseTopic[] = [];

  courseTypeEnum = CourseType;

  constructor(
    private exerciseService: ExerciseService,
    private courseService: CourseService,
    private exerciseTopicService: ExerciseTopicService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      difficulty: 0,
      course: '',
      courseType: CourseType.undefined,
      topic: 0,
      is_corrected: false,
      source: '',
      content: null,
    });

    this.courseService.getCourses().subscribe((data) => {
      this.courseList = data;
    });

    this.exerciseTopicService.getExerciseTopicList().subscribe((data) => {
      this.exerciseTopicList = data;
    });

    this.form.get('courseType')?.valueChanges.subscribe((data) => {
      this.updateCourseList();
      this.form.get('course')?.setValue('');
    });
  }

  updateCourseList(): void {
    this.courseListForSelectedType = this.courseList.filter(
      (course) => course.type === this.form.get('courseType')?.value
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.form.get('content')?.setValue(file);
  }

  addExercise(): void {
    let newExercise: ExercisePostParameters = {
      title: this.form.get('title')?.value,
      difficulty: this.form.get('difficulty')?.value,
      topicId: this.form.get('topic')?.value,
      is_corrected: this.form.get('is_corrected')?.value,
      source: this.form.get('source')?.value,
      content: this.form.get('content')?.value,
    };

    console.log(newExercise);
    this.exerciseService.addExercise(newExercise).subscribe((data) => {
      console.log(data);
    });
  }
}
