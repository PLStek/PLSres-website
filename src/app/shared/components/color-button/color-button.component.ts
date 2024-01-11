import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-button',
  templateUrl: './color-button.component.html',
  styleUrls: ['./color-button.component.scss'],
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
