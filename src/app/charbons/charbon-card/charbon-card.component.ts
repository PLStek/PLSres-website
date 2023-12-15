import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { getCourseTypeColor } from 'src/app/shared/utils/functions';

@Component({
  selector: 'app-charbon-card',
  templateUrl: './charbon-card.component.html',
  styleUrls: ['./charbon-card.component.scss'],
})
export class CharbonCardComponent implements OnChanges {
  @Input() charbon!: Charbon;
  @Input() edit: boolean = false;
  color!: string;

  constructor() {
    this.charbon;
    this.edit;
  }
  
  ngOnChanges(): void {
    this.color = getCourseTypeColor(this.charbon.courseType);
  }
}
