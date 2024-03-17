import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { ExerciseTopicService } from 'src/app/shared/services/exercise-topic.service';
import { Course } from 'src/app/shared/models/course.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';
import {
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ExercisePostParameters } from 'src/app/shared/models/exercise-post-parameters.model';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RatingModule, MainButtonComponent],
})
export class AddExerciceComponent implements OnInit {
  @Input() baseExercise?: Exercise;
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
    private exerciseService: ExerciseService,
    private courseService: CourseService,
    private exerciseTopicService: ExerciseTopicService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courseList = data;
      },
      error: () => {
        this.toastr.error('Erreur lors de la récupération des cours', 'Erreur');
      },
    });

    this.exerciseTopicService.getExerciseTopicList().subscribe({
      next: (data) => {
        this.exerciseTopicList = data;
        if (this.baseExercise) {
          this.fillForm(this.baseExercise, data);
        }
      },
      error: () => {
        this.toastr.error(
          "Erreur lors de la récupération des thèmes d'exercices",
          'Erreur'
        );
      },
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      difficulty: new FormControl(null, Validators.required),
      courseType: new FormControl(CourseType.undefined),
      course: new FormControl(''),
      topic: new FormControl('', Validators.required),
      isCorrected: new FormControl(false),
      source: new FormControl('', Validators.required),
      content: new FormControl(null, Validators.required),
    });
  }

  fillForm(exercise: Exercise, topics: ExerciseTopic[]): void {
    this.form.setValue({
      title: exercise.title,
      difficulty: exercise.difficulty,
      course: topics.find((t) => t.id === exercise?.topicId)?.course,
      courseType: topics.find((t) => t.id === exercise?.topicId)?.courseType,
      topic: exercise.topicId,
      isCorrected: exercise.isCorrected,
      source: exercise.source,
      content: null,
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.form.get('content')?.setValue(file);
  }

  onCourseTypeChange() {
    this.form.patchValue({ course: '' });
  }

  submit(): void {
    this.submitted = true;
    if (!this.form.valid) return;

    let newExercise: ExercisePostParameters = {
      title: this.form.get('title')?.value,
      difficulty: this.form.get('difficulty')?.value,
      topicId: this.form.get('topic')?.value,
      isCorrected: this.form.get('isCorrected')?.value,
      source: this.form.get('source')?.value,
      content: this.form.get('content')?.value,
    };

    this.baseExercise
      ? this.updateExercise(newExercise)
      : this.addExercise(newExercise);
  }

  addExercise(newExercise: ExercisePostParameters): void {
    this.exerciseService.addExercise(newExercise).subscribe({
      next: () => {
        this.initForm();
        this.onValidate.emit();
      },
      error: (error) => {
        if (error.status === 401) {
          this.authService.logout(true);
        }
        this.toastr.error("Erreur lors de l'ajout de l'exercice", 'Erreur');
      },
    });
  }

  updateExercise(newExercise: ExercisePostParameters): void {
    this.exerciseService
      .updateExercise(this.baseExercise?.id ?? 0, newExercise)
      .subscribe({
        next: () => {
          this.initForm();
          this.onValidate.emit();
        },
        error: (error) => {
          if (error.status === 401) {
            this.authService.logout(true);
          }
          this.toastr.error(
            "Erreur lors de la modification de l'exercice",
            'Erreur'
          );
        },
      });
  }
}
