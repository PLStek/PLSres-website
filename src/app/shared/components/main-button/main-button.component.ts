import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-main-button',
    templateUrl: './main-button.component.html',
    styleUrls: ['./main-button.component.scss'],
    standalone: true,
    imports: [NgClass],
})
export class MainButtonComponent implements OnInit {
  @Input() isFilled: boolean = false;
  @Input() isBig: boolean = false;  

  constructor() {
    this.isFilled;
    this.isBig;
  }

  ngOnInit(): void {}
}
