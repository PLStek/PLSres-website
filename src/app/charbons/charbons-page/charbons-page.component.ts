import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';

@Component({
  selector: 'app-charbons-page',
  templateUrl: './charbons-page.component.html',
  styleUrls: ['./charbons-page.component.scss'],
})
export class CharbonsPageComponent implements OnInit {
  nextThreeCharbons: Charbon[] = [];
  selectedCharbon: Charbon | null = null;

  constructor(private charbonService: CharbonService) {}

  ngOnInit(): void {
    this.fetchThreeUpcomingCharbons();
  }

  fetchThreeUpcomingCharbons(): void {
    this.charbonService
      .getCharbonList({ minDate: new Date(), limit: 3 })
      .subscribe((charbons) => {
        this.nextThreeCharbons = charbons;
      });
  }  

  handleSelectedCharbonChange(selectedCharbon: Charbon | null): void {
    this.selectedCharbon = selectedCharbon;
  }
}
