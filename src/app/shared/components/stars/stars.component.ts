import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {
  @Input() starCount: number = 1;

  constructor() {
    this.starCount;
   }

  ngOnInit(): void {
  }


  generateStars(): string {
    return '★'.repeat(this.starCount) + '☆'.repeat(5 - this.starCount);
  }

}
