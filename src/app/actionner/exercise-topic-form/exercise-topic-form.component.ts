import { ExerciseTopicService } from 'src/app/shared/services/exercise-topic.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Course } from 'src/app/shared/models/course.model';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';
import { ExerciseTopicPostParameters } from 'src/app/shared/models/exercise-topic-post-parameters';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exercise-topic-form',
  templateUrl: './exercise-topic-form.component.html',
  styleUrls: ['./exercise-topic-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MainButtonComponent],
})
export class ExerciseTopicFormComponent implements OnInit {
  @Input() baseExerciseTopic?: ExerciseTopic;
  @Output() onValidate = new EventEmitter<void>();

  form!: FormGroup;
  submitted = false;

  courseList: Course[] = [];
  exerciseTopicList: ExerciseTopic[] = [];

  CourseType = CourseType;

  get courseListForSelectedType(): Course[] {
    return this.courseList.filter(
      (course) => course.type == this.form.get('courseType')?.value
    );
  }

  constructor(
    private formBuilder: FormBuilder,
    private exerciseTopicService: ExerciseTopicService,
    private courseService: CourseService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.baseExerciseTopic) {
      this.fillForm(this.baseExerciseTopic);
    }

    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courseList = data;
      },
      error: () => {
        this.toastr.error('Erreur lors de la récupération des cours', 'Erreur');
      },
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      courseType: new FormControl(CourseType.undefined),
      course: new FormControl('', Validators.required),
    });
  }

  fillForm(exerciseTopic: ExerciseTopic) {
    this.form.setValue({
      title: exerciseTopic.topic,
      course: exerciseTopic.course,
      courseType: exerciseTopic.courseType,
    });
  }

  onCourseTypeChange() {
    this.form.patchValue({ course: '' });
  }

  submit(): void {
    this.submitted = true;
    if (!this.form.valid) return;

    const newExerciseTopic: ExerciseTopicPostParameters = {
      title: this.form.get('title')?.value,
      course: this.form.get('course')?.value,
    };

    this.baseExerciseTopic
      ? this.updateExerciseTopic(newExerciseTopic)
      : this.addExerciseTopic(newExerciseTopic);
  }

  addExerciseTopic(newExerciseTopic: ExerciseTopicPostParameters): void {
    this.exerciseTopicService.addExerciseTopic(newExerciseTopic).subscribe({
      next: () => {
        this.initForm();
        this.onValidate.emit();
      },
      error: () => {
        this.toastr.error(
          "Erreur lors de l'ajout du thème d'exercice",
          'Erreur'
        );
      },
    });
  }

  updateExerciseTopic(newExerciseTopic: ExerciseTopicPostParameters): void {
    this.exerciseTopicService
      .updateExerciseTopic(this.baseExerciseTopic?.id ?? 0, newExerciseTopic)
      .subscribe({
        next: () => {
          this.initForm();
          this.onValidate.emit();
        },
        error: () => {
          this.toastr.error(
            "Erreur lors de la modification du thème d'exercice",
            'Erreur'
          );
        },
      });
  }
}
