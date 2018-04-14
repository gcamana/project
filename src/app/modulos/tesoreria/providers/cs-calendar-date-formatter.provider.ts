import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { getISOWeek } from 'date-fns';
import { DatePipe } from '@angular/common';

export class CsCalendarDateFormatter extends CalendarDateFormatter {
  public weekViewTitle({ date, locale }: DateFormatterParams): string {
    const year: string = new DatePipe(locale).transform(date, 'y', locale);
    const weekNumber: number = getISOWeek(date);
    return `Semana ${weekNumber} en ${year}`;
  }

  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'EEEEE', locale);
  }

//   public monthViewTitle({ date, locale }: DateFormatterParams): string {
//     return new DatePipe(locale).transform(date, 'MMM y', locale);
//   }

  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'EEEEE', locale);
  }

  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'HH:mm', locale);
  }
}

