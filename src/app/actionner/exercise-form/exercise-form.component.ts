import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() baseExercise?: Exercise;
  @Output() onValidate = new EventEmitter<void>();

  form!: FormGroup;

  courseList: Course[] = [];
  courseListForSelectedType: Course[] = [];
  exerciseTopicList: ExerciseTopic[] = [];

  //TODO: make static everywhere and check case
  courseTypeEnum = CourseType;

  constructor(
    private exerciseService: ExerciseService,
    private courseService: CourseService,
    private exerciseTopicService: ExerciseTopicService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm(this.baseExercise);

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

  initForm(baseExercise?: Exercise): void {
    if (baseExercise) {
      this.form = this.formBuilder.group({
        title: baseExercise.title,
        difficulty: baseExercise.difficulty,
        course: '',
        courseType: CourseType.undefined,
        topic: baseExercise.topicId,
        isCorrected: baseExercise.isCorrected,
        source: baseExercise.source,
        content: null,
      });
    } else {
      this.form = this.formBuilder.group({
        title: '',
        difficulty: 0,
        course: '',
        courseType: CourseType.undefined,
        topic: 0,
        isCorrected: false,
        source: '',
        content: null,
      });
    }
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
      isCorrected: this.form.get('isCorrected')?.value,
      source: this.form.get('source')?.value,
      content: this.form.get('content')?.value,
    };

    this.exerciseService.addExercise(newExercise).subscribe((success) => {
      if (success) this.onValidate.emit();
      console.log(success);
    });
  }
}
