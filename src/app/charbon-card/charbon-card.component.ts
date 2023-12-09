import { Component, Input, OnInit } from '@angular/core';
import { Charbon } from 'src/models/Charbon';

@Component({
  selector: 'app-charbon-card',
  templateUrl: './charbon-card.component.html',
  styleUrls: ['./charbon-card.component.scss'],
})
export class CharbonCardComponent implements OnInit {
  @Input() charbon!: Charbon;
  @Input() edit: boolean = false;

  constructor() {
    this.charbon;
    this.edit;
  }

  ngOnInit(): void {}
}
