import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import {
  CalendarApi,
  CalendarOptions,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [FullCalendarModule],
})
export class CalendarComponent implements OnInit {
  calendarEvents: EventInput[] = [];
  calendarApi?: CalendarApi;

  @Output() selectedCharbonChange = new EventEmitter<Charbon | null>();

  constructor(
    private charbonService: CharbonService,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCharbons();
  }

  handleEventClick(clickInfo: EventClickArg): void {
    if (clickInfo.event) {
      const clickedEvent = clickInfo.event;
      const matchedCharbon = clickedEvent.extendedProps as Charbon;

      this.selectedCharbonChange.emit(matchedCharbon ?? null);
    }
  }

  getCharbons(): void {
    this.charbonService.getCharbons().subscribe({
      next: (charbons) =>
        charbons.forEach((charbon: Charbon) => this.addEvent(charbon)),
      error: () => {
        this.toastr.error('Erreur lors du chargement du calendrier', 'Erreur');
      },
    });
  }

  addEvent(charbon: Charbon): void {
    const isoFormattedDate = this.datePipe.transform(
      charbon.date,
      'yyyy-MM-ddTHH:mm:ss'
    );

    const endDate = this.datePipe.transform(
      charbon.date,
      'yyyy-MM-ddTHH:mm:59'
    );

    this.calendarApi?.addEvent({
      id: charbon.id.toString(),
      title: charbon.course,
      start: isoFormattedDate!,
      end: endDate!,
      display: 'block',
      backgroundColor: '#' + charbon.courseType,
      borderColor: '#D2D2D2',
      extendedProps: charbon,
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.calendarEvents,
    firstDay: 1,
    locale: 'fr',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
    },
    dayHeaderFormat: {
      weekday: 'long',
    },
    // Handling the event click
    eventClick: this.handleEventClick.bind(this),
    datesSet: (dateInfo) => {
      if (!this.calendarApi) this.calendarApi = dateInfo.view.calendar;
    },
  };
}
