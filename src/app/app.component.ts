import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/models/Charbon';
import { CharbonService } from './charbon.service';

import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PLSres';
  charbonList!: Charbon[];
  calendarEvents: EventInput[] = [];
  selectedCharbon: Charbon | null = null;

  constructor(
    private charbonService: CharbonService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.charbonList = this.charbonService.getCharbonList();

    this.charbonList.forEach((charbon: Charbon) => {
      const isoFormattedDate = this.datePipe.transform(
        charbon.date,
        'yyyy-MM-ddTHH:mm:ss'
      );
      this.calendarEvents.push({
        title: charbon.course,
        date: isoFormattedDate!,
        display: 'block',
        backgroundColor: '#' + charbon.courseType,
        borderColor: '#D2D2D2',
        extendedProps: {
          charbonId: charbon.id,
        },
      });
    });
    console.log(this.calendarEvents);
  }
  handleEventClick(clickInfo: EventClickArg): void {
    this.selectedCharbon = null; // Réinitialise selectedCharbon

    if (clickInfo.event) {
      const clickedEvent = clickInfo.event;
      const charbonId = clickedEvent.extendedProps['charbonId'];

      const matchedCharbon = this.charbonList.find((charbon: Charbon) => {
        return charbon && charbon.id == charbonId;
      });

      if (matchedCharbon) {
        this.selectedCharbon = matchedCharbon;
      }
    }
  }

  calendarOptions: CalendarOptions = {
    timeZone: 'Etc/UTC',
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.calendarEvents,
    firstDay: 1,
    locale: 'fr',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
    },
    eventClick: this.handleEventClick.bind(this),
  };
}
