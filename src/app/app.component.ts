import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/models/Charbon';
import { CourseTypes } from 'src/models/CourseTypes';
import { CharbonService } from './charbon.service';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PLSres';
  charbonList!: Charbon[];
  calendarEvents: any[] = [];

  constructor(private charbonService: CharbonService) {
  }

  ngOnInit(): void {
    this.charbonList = this.charbonService.getCharbonList();
    this.charbonList.forEach((charbon: Charbon) => {
      const [day, month, year] = charbon.date.split('/');
      const isoFormattedDate = `${year}-${month}-${day}`;
      this.calendarEvents.push({
        title: charbon.course,
        start: isoFormattedDate,
      });
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.calendarEvents
  };
}
  