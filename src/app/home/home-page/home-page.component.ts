import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/models/charbon.model';
import { Exercise } from 'src/models/exercise.model';
import { CharbonService } from 'src/app/services/charbon.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  title = 'PLSres';
  charbonList!: Charbon[];
  exerciseList!: Exercise[];

  constructor(private charbonService: CharbonService) {}

  ngOnInit(): void {
    this.charbonList = this.charbonService.getCharbonList();
  }

}
