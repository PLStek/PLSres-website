import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/models/charbon.model';
import { Exercise } from 'src/models/exercise.model';
import { CharbonService } from '../charbon.service';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

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
