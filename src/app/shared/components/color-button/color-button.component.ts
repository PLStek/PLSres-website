import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-color-button',
    templateUrl: './color-button.component.html',
    styleUrls: ['./color-button.component.scss'],
    standalone: true,
    imports: [NgClass],
})
export class ColorButtonComponent implements OnInit {
  @Input() courseType: string = '';
  @Input() isFilled: boolean = false;

  constructor() {
    this.courseType;
    this.isFilled;
  }

  ngOnInit(): void {}
}
