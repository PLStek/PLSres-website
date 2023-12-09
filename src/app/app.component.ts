import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/models/Charbon';
import { CharbonService } from './charbon.service';

import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PLSres';
  charbonList!: Charbon[];
  charbonListFirst3!: Charbon[];
  calendarEvents: EventInput[] = [];
  selectedCharbon: Charbon | null = null;

  constructor(private charbonService: CharbonService) {}

  ngOnInit(): void {
    this.charbonList = this.charbonService.getCharbonList();
    //pour le calendrier
    this.charbonList.forEach((charbon: Charbon) => {
      const isoFormattedDate = charbon.date;
      this.calendarEvents.push({
        title: charbon.course,
        date: isoFormattedDate!,
        display: 'block',
        extendedProps: {
          charbonId: charbon.id,
        },
      });
    });

    // Trier la liste par date dans l'ordre croissant
    this.charbonList.sort((a: Charbon, b: Charbon) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

    // Limiter la liste aux trois premiers éléments
    this.charbonListFirst3 = this.charbonList.slice(0, 3);
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
    timeZone: 'Europe/Paris',
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.calendarEvents,
    firstDay: 1,
    locale: 'fr',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
    },
    eventClick: this.handleEventClick.bind(this),
  };
}
