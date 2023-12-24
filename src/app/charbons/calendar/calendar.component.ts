import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import {
  CalendarApi,
  CalendarOptions,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { render } from '@fullcalendar/core/preact';
import { CharbonService } from 'src/app/shared/services/charbon.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  charbonList: Charbon[] = [];
  calendarEvents: EventInput[] = [];
  selectedCharbon: Charbon | null = null;
  calendarApi?: CalendarApi;

  @Output() selectedCharbonChange = new EventEmitter<Charbon | null>();

  constructor(
    private charbonService: CharbonService,
    private datePipe: DatePipe,
    private elementRef: ElementRef
  ) {}

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
        this.selectedCharbonChange.emit(this.selectedCharbon);
      }
    }
  }

  addCurrentMonthEvents(minDate: Date, maxDate: Date): void {
    this.charbonService
      .getCharbonList({ minDate: minDate, maxDate: maxDate })
      .subscribe((charbons) => {
        charbons.forEach((charbon: Charbon) => {
          
          const isoFormattedDate = this.datePipe.transform(
            charbon.date,
            'yyyy-MM-ddTHH:mm:ss'
            );
            const eventExists = this.calendarApi
            ?.getEvents()
            .some((event) => event.extendedProps['charbonId'] === charbon.id);
            
            if (!eventExists) {
            this.charbonList.push(charbon);
            this.calendarApi?.addEvent({
              title: charbon.course,
              date: isoFormattedDate!,
              display: 'block',
              backgroundColor: '#' + charbon.courseType,
              borderColor: '#D2D2D2',
              extendedProps: {
                charbonId: charbon.id,
              },
            });
          }
        });
        console.log(this.calendarApi);
      });
  }

  calendarOptions: CalendarOptions = {
    timeZone: 'Europe/France',
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
    dayHeaderFormat: {
      weekday: 'long',
    },
    datesSet: (dateInfo) => {
      if (!this.calendarApi) {
        this.calendarApi = dateInfo.view.calendar;
      }
      this.addCurrentMonthEvents(dateInfo.start, dateInfo.end);
    },
  };
}
