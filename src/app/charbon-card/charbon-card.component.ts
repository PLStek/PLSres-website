import { Component, Input, OnInit } from '@angular/core';
import { Charbon } from 'src/models/Charbon';
import { CourseTypes } from 'src/models/CourseTypes';

@Component({
  selector: 'app-charbon-card',
  templateUrl: './charbon-card.component.html',
  styleUrls: ['./charbon-card.component.scss'],
})
export class CharbonCardComponent implements OnInit {
  @Input() charbon!: Charbon;

  constructor() {
    this.charbon;
  }

  ngOnInit(): void {}
}
