import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/models/charbon.model';
import { CharbonService } from '../charbon.service';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-charbons-page',
  templateUrl: './charbons-page.component.html',
  styleUrls: ['./charbons-page.component.scss'],
})
export class CharbonsPageComponent implements OnInit {
  title = 'PLSres';
  charbonList!: Charbon[];
  selectedCharbon: Charbon | null = null;

  constructor(
    private charbonService: CharbonService,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.charbonList = this.charbonService.getCharbonList();
  }

  handleSelectedCharbonChange(selectedCharbon: Charbon | null): void {
    this.selectedCharbon = selectedCharbon;
  }
}
