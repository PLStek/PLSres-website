import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Charbon } from 'src/models/charbon.model';
import { CharbonService } from '../charbon.service';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  charbonList!: Charbon[];
  calendarEvents: EventInput[] = [];
  selectedCharbon: Charbon | null = null;
  @Output() selectedCharbonChange = new EventEmitter<Charbon | null>();

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
