import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';

@Component({
  selector: 'app-edit-charbon-actionneur',
  templateUrl: './charbon-edition-page.component.html',
  styleUrls: ['./charbon-edition-page.component.scss'],
})
export class CharbonEditionPageComponent implements OnInit {
  charbonList: Charbon[] = [];
  constructor(private charbonService: CharbonService) {}

  ngOnInit(): void {
    this.charbonService.getCharbonList({ limit: 50 }).subscribe((charbons) => {
      this.charbonList = charbons;
    });
  }
}
