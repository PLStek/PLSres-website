import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/models/charbon.model';
import { CharbonService } from 'src/app/services/charbon.service';

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
    private charbonService: CharbonService
  ) {}

  ngOnInit(): void {
    this.charbonList = this.charbonService.getCharbonList();
  }

  handleSelectedCharbonChange(selectedCharbon: Charbon | null): void {
    this.selectedCharbon = selectedCharbon;
  }
}
