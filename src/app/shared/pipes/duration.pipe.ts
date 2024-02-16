import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor(value / 60) % 60;

    return `${this.pad(hours)}h${this.pad(minutes)}`;
  }

  pad(digit: any): string {
    return digit < 10 ? '0' + digit : digit;
  }
}
