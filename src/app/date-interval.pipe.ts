import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateInterval',
})
export class DateIntervalPipe implements PipeTransform {
  transform(date: Date): string {
    const now = new Date();
    const timeDifferenceInMilliseconds = date.getTime() - now.getTime();
    const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
    const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
    const timeDifferenceInHours = timeDifferenceInMinutes / 60;
    const timeDifferenceInDays = timeDifferenceInHours / 24;
    const timeDifferenceInWeeks = timeDifferenceInDays / 7;

    if (timeDifferenceInWeeks >= 1) {
      const numberOfWeeks = Math.floor(timeDifferenceInWeeks);
      return `Dans ${numberOfWeeks} semaine${
        numberOfWeeks > 1 ? 's' : ''
      }`;
    } else if (timeDifferenceInDays >= 2) {
      const nombreDeJours = Math.floor(timeDifferenceInDays);
      return `Il y a ${nombreDeJours} jour${nombreDeJours > 1 ? 's' : ''}`;
    } else if (timeDifferenceInDays >= 1) {
      return 'Hier';
    } else if (timeDifferenceInHours >= 1) {
      const numberOfHours = Math.floor(timeDifferenceInHours);
      return `Dans ${numberOfHours} heure${numberOfHours > 1 ? 's' : ''}`;
    } else {
      const numberOfMinutes = Math.floor(timeDifferenceInHours);
      return `Dans ${numberOfMinutes} minute${numberOfMinutes > 1 ? 's' : ''}`;
    }
  }
}
