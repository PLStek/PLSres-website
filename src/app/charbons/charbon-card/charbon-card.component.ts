import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';

@Component({
  selector: 'app-charbon-card',
  templateUrl: './charbon-card.component.html',
  styleUrls: ['./charbon-card.component.scss'],
})
export class CharbonCardComponent implements OnChanges {
  @Input() charbon!: Charbon;
  @Input() edit: boolean = false;

  constructor() {
    this.charbon;
    this.edit;
  }
  
  ngOnChanges(): void {
  }
}
