import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-button',
  templateUrl: './color-button.component.html',
  styleUrls: ['./color-button.component.scss'],
})
export class ColorButtonComponent implements OnInit {
  @Input() courseType: string = "";
  @Input() isFilled: boolean = false;
  @Input() content: string = 'Main button';

  constructor() {
    this.courseType;
    this.isFilled;
    this.content;
  }

  ngOnInit(): void {}
}
