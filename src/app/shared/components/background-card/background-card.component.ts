import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainButtonComponent } from '../main-button/main-button.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-background-card',
    templateUrl: './background-card.component.html',
    styleUrls: ['./background-card.component.scss'],
    standalone: true,
    imports: [NgIf, MainButtonComponent, RouterLink]
})
export class BackgroundCardComponent implements OnInit {

  @Input() title?: string = undefined;
  @Input() buttonText?: string = undefined;
  @Input() buttonOnClick?: string = undefined;
  @Input() buttonRouterLink?: string = undefined;


  constructor() { }

  ngOnInit(): void {
  }

}
