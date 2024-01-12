import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';

@Component({
  selector: 'app-edit-charbon-actionneur',
  templateUrl: './charbon-edition-page.component.html',
  styleUrls: ['./charbon-edition-page.component.scss'],
})
export class CharbonEditionPageComponent implements OnInit {
  selectedCharbon: Charbon | null = null;

  constructor() {}

  ngOnInit(): void {
  }

  handleSelectedCharbonChange(selectedCharbon: Charbon | null): void {
    this.selectedCharbon = selectedCharbon;
  }
}
