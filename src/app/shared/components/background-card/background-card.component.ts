import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-background-card',
  templateUrl: './background-card.component.html',
  styleUrls: ['./background-card.component.scss']
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
