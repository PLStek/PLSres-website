import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.scss'],
})
export class AnnouncementCardComponent implements OnInit {
  @Input() title!: string;
  @Input() contentSource!: string;
  @Input() date!: Date;
  @Input() collapse?: boolean = false;

  constructor() {
    this.title;
    this.contentSource;
    this.date
  }

  ngOnInit(): void { }
}
