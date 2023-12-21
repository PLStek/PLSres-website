import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { ExerciseTopicService } from 'src/app/shared/services/exercise-topic.service';
import { Course } from 'src/app/shared/models/course.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-exercice',
  templateUrl: './add-exercice.component.html',
  styleUrls: ['./add-exercice.component.scss']
})
export class AddExerciceComponent implements OnInit {
  newExercise!: Exercise;
  form!: FormGroup;

  courseList: Course[] = [];
  courseListForSelectedType: Course[] = [];
  exerciseTopicList: ExerciseTopic[] = [];

  courseTypeEnum = CourseType;

  constructor(
    private exerciseService : ExerciseService,
    private courseService : CoursesService,
    private exerciseTopicService : ExerciseTopicService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      difficulty: 0,
      topic: 0,
      is_corrected: false,
      source: '',
    });
    
    this.courseService.getCourses().subscribe((data) => {
      this.courseList = data;
    });
    this.exerciseTopicService.getExerciseTopicList().subscribe((data) => {
      this.exerciseTopicList = data;
    });  

  }
  addExerciec() : void{
    console.log(this.newExercise);
  }
  /*
    onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const dummyExercise = new Exercise(
      0,
      'Test exercise',
      1,
      1,
      false,
      'Source'
    );
    if (file) {
      this.exerciseService
        .addExercise(dummyExercise, file)
        .subscribe((data) => {
          console.log(data);
        });
    }
  }
  */
}
