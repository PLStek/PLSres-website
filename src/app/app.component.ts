import { Exercise } from 'src/models/exercise.model';
import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/models/charbon.model';
import { CharbonService } from './services/charbon.service';
import { ExerciseService } from './services/exercise.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PLSres';
  charbonList!: Charbon[];
  exerciseList!: Exercise[];
  selectedCharbon: Charbon | null = null;

  constructor(private charbonService: CharbonService, private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.charbonList = this.charbonService.getCharbonList();
    this.exerciseList = this.exerciseService.getExerciseList();
  }

  handleSelectedCharbonChange(selectedCharbon: Charbon | null): void {
    this.selectedCharbon = selectedCharbon;
  }
}
