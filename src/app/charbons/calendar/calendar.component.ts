import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { render } from '@fullcalendar/core/preact';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnChanges {
  @Input() charbonList: Charbon[] = [];
  calendarEvents: EventInput[] = [];
  selectedCharbon: Charbon | null = null;

  @Output() selectedCharbonChange = new EventEmitter<Charbon | null>();

  constructor(private datePipe: DatePipe, private elementRef: ElementRef) {
    this.charbonList;
  }

  ngOnChanges(): void {
    this.charbonList!.forEach((charbon: Charbon) => {
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

    //TODO: try to find a better way to refresh the calendar
    this.elementRef.nativeElement.querySelector('calendar').fullCalendar(render);
  }
  handleEventClick(clickInfo: EventClickArg): void {
    this.selectedCharbon = null; // Réinitialise selectedCharbon

    if (clickInfo.event) {
      const clickedEvent = clickInfo.event;
      const charbonId = clickedEvent.extendedProps['charbonId'];

      const matchedCharbon = this.charbonList!.find((charbon: Charbon) => {
        return charbon && charbon.id == charbonId;
      });

      if (matchedCharbon) {
        this.selectedCharbon = matchedCharbon;
        this.selectedCharbonChange.emit(this.selectedCharbon);
      }
    }
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
  };
}
