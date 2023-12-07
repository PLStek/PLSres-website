import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss'],
})
export class MainButtonComponent implements OnInit {
  @Input() isFilled: boolean = false;
  @Input() isBig: boolean = false;  
  @Input() content: string = 'Main button';

  constructor() {
    this.isFilled;
    this.content;
  }

  ngOnInit(): void {}
}
