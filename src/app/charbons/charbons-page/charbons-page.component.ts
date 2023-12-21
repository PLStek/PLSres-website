import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';

@Component({
  selector: 'app-charbons-page',
  templateUrl: './charbons-page.component.html',
  styleUrls: ['./charbons-page.component.scss'],
})
export class CharbonsPageComponent implements OnInit {
  title = 'PLSres';
  charbonList: Charbon[] = [];
  selectedCharbon: Charbon | null = null;
  

  
  constructor(private charbonService: CharbonService) {}

  ngOnInit(): void {
    this.charbonService.getCharbonList().subscribe((charbons) => {
      this.charbonList = charbons;
    });
  }

  handleSelectedCharbonChange(selectedCharbon: Charbon | null): void {
    this.selectedCharbon = selectedCharbon;
  }

}
