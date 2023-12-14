import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { ExerciseService } from 'src/app/shared/services/exercise.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PLSres';
  exerciseList!: Exercise[];

  constructor(
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.exerciseList = this.exerciseService.getExerciseList();
  }

}
