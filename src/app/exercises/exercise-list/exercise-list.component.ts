import { Component, Input, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Course } from 'src/app/shared/models/course.model';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { ExerciseTopicService } from 'src/app/shared/services/exercise-topic.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';
import { ExerciseComponent } from '../exercise/exercise.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RatingModule, ExerciseComponent],
})
export class ExerciseListComponent implements OnInit {
  @Input() editable = false;

  exerciseTopicList!: ExerciseTopic[];

  courseList: Course[] = [];
  courseListForSelectedType: Course[] = [];

  sortForm!: FormGroup;

  CourseType = CourseType;

  constructor(
    private formBuilder: FormBuilder,
    private exerciseTopicService: ExerciseTopicService,
    private courseService: CourseService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.sortForm = this.formBuilder.group({
      courseType: new FormControl(CourseType.undefined),
      course: new FormControl(''),
      sort: new FormControl('nameAsc'),
      maxRating: new FormControl(5),
    });

    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courseList = data;
        this.updateCourseList();
      },
      error: () => {
        this.toastr.error('Erreur lors du chargement des cours', 'Erreur');
      },
    });

    this.sortForm.valueChanges.subscribe(() => {
      this.exerciseTopicList = [];
      this.fetchExerciseTopics();
    });

    this.sortForm.get('courseType')?.valueChanges.subscribe(() => {
      this.updateCourseList();
      this.sortForm.get('course')?.setValue('');
    });

    this.fetchExerciseTopics();
  }

  resetExerciseTopics(): void {
    this.exerciseTopicList = [];
    this.fetchExerciseTopics();
  }

  fetchExerciseTopics(): void {
    const formData = this.sortForm.value;

    this.exerciseTopicService.getExerciseTopicList().subscribe({
      next: (data) => {
        this.exerciseTopicList = data.filter((et) => et.exerciseCount > 0);
      },
      error: () => {
        this.toastr.error(
          "Erreur lors de la récupération des thèmes d'exercices",
          'Erreur'
        );
      },
    });
  }

  updateCourseList(): void {
    this.courseListForSelectedType = this.courseList.filter(
      (course) => course.type === this.sortForm.get('courseType')?.value
    );
  }
}
