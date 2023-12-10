import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateInterval',
})
export class DateIntervalPipe implements PipeTransform {
  transform(date: Date): string {
    const now = new Date();
    const diffInMilliseconds = date.getTime() - now.getTime();
    const diffInMinutes = Math.abs(diffInMilliseconds / 60000);
    const diffInHours = diffInMinutes / 60;

    // Getting the difference in days by getting rid of the time of day
    now.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const diffInDays = Math.abs(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    const diffInWeeks = diffInDays / 7;

    let timeString = diffInMilliseconds < 0 ? 'Il y a ' : 'Dans ';

    if (diffInWeeks >= 1) {
      const weeks = Math.floor(diffInWeeks);
      timeString += weeks + ' semaine' + (weeks > 1 ? 's' : '');
    } else if (diffInDays >= 2) {
      const days = Math.floor(diffInDays);
      timeString += days + ' jours';
    } else if (diffInDays >= 1) {
      timeString = diffInMilliseconds < 0 ? 'Hier' : 'Demain';
    } else if (diffInHours >= 1) {
      const hours = Math.floor(diffInHours);
      timeString += hours + ' heure' + (hours > 1 ? 's' : '');
    } else {
      const minutes = Math.floor(diffInMinutes);
      timeString += minutes + ' minute' + (minutes > 1 ? 's' : '');
    }

    return timeString;
  }
}
