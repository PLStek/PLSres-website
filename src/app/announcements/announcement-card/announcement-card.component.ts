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
  @Input() isEmpty?: boolean = false;

  currentDate: string = new Date().toISOString().split('T')[0];

  constructor() {
    this.title;
    this.contentSource;
    this.date
  }
  addAnnouncement(): void {
    console.log(this.title);
    console.log(this.contentSource);
    console.log(this.date);
  }
  ngOnInit(): void { }
}
