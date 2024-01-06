import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  title = 'PLSres';
  charbonList!: Charbon[];
  exerciseList!: Exercise[];

  constructor(private charbonService: CharbonService) {
    this.charbonList = [];
  }

  ngOnInit(): void {
    const now = new Date();

    this.charbonService
      .getCharbonList({ minDate: now, limit: 3, sort: 'dateAsc' })
      .subscribe((charbons) => {
        this.charbonList = charbons;
      });
  }
}
