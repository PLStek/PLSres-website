import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import {
  CalendarApi,
  CalendarOptions,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CharbonService } from 'src/app/shared/services/charbon.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  calendarEvents: EventInput[] = [];
  calendarApi?: CalendarApi;
  fetchedMonths = new Set<number>();

  @Output() selectedCharbonChange = new EventEmitter<Charbon | null>();

  constructor(
    private charbonService: CharbonService,
    private datePipe: DatePipe
  ) {}

  handleEventClick(clickInfo: EventClickArg): void {
    if (clickInfo.event) {
      const clickedEvent = clickInfo.event;
      const matchedCharbon = clickedEvent.extendedProps as Charbon;

      this.selectedCharbonChange.emit(matchedCharbon ?? null);
    }
  }

  addCurrentMonthEvents(minDate: Date, maxDate: Date): void {
    this.charbonService
      .getCharbonList({ minDate: minDate, maxDate: maxDate })
      .subscribe((charbons) =>
        charbons.forEach((charbon: Charbon) =>
          this.addEventIfNotExists(charbon)
        )
      );
  }
  addEventIfNotExists(charbon: Charbon): void {
    const eventExists = this.calendarApi
      ?.getEvents()
      .some((event) => event.extendedProps['id'] === charbon.id);

    if (!eventExists) {
      this.addEvent(charbon);
    }
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
    // Handling the month change
    datesSet: (dateInfo) => {
      // Setting the calendarApi if not set yet
      if (!this.calendarApi) {
        this.calendarApi = dateInfo.view.calendar;
      }

      // Verifying that the current month has not been fetched yet
      const time = dateInfo.start.getTime();
      if (!this.fetchedMonths.has(time)) {
        this.addCurrentMonthEvents(dateInfo.start, dateInfo.end);

        // Adding the current month to the fetched months
        this.fetchedMonths.add(time);
      }
    },
  };
}
