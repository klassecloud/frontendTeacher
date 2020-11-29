import {Component, Input, OnInit} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import {Task_Interface} from '../task-interface';
import { Tasks } from '../task-data';


@Component({
  selector: 'app-root',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{

  @Input() tasks: Task_Interface[] = [];
  activatebar = false;
  activateend = false;
  activatestart = false;
  public Wochenendeheader: string;
  public Verlaufheader: string;
  public Startheader: string;
  public Endheader: string;

  // @ts-ignore
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: true, // initial value
    events: [],
  };

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
    if (this.Wochenendeheader === 'Wochenende ausblenden')
    {
      this.Wochenendeheader = 'Wochenende einblenden';
    }else {this.Wochenendeheader = 'Wochenende ausblenden'; }
  }
  showCalendar()
  {
    this.tasks = Tasks;
    const name = [];
    const start = [];
    const end = [];
    const color = [];
    let zaehler = 0;
    for (let index = 0; index < this.tasks.length; index++)
    {
      if (this.activatestart)
      {
        zaehler++;
        name.push('Anfang: ' + Tasks[index].name);
        start.push(Tasks[index].start);
        end.push(Tasks[index].start);
        if (Tasks[index].uebung) {
          color.push('green');
        }
        else { color.push('purple'); }
      }
      if (this.activateend)
      {
        zaehler++;
        name.push('Abgabe: ' + Tasks[index].name);
        start.push(Tasks[index].end);
        end.push(Tasks[index].end);
        if (Tasks[index].uebung) {
          color.push('green');
        }
        else { color.push('purple'); }
      }
      if (this.activatebar)
      {
        zaehler++;
        name.push(Tasks[index].name);
        start.push(Tasks[index].start);
        end.push(Tasks[index].end);
        if (Tasks[index].uebung) {
          color.push('green');
        } else {
          color.push('purple');
        }
      }
    }
    const newEvents = [];
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index <= zaehler; index++)
    {
      newEvents.push({ allDay: true, title: name.pop(), color: color.pop(), start: start.pop(), end: end.pop() });
    }
    this.calendarOptions.events = newEvents;
  }
  activateEndDate()
  {
    this.activateend = !this.activateend;
    if (this.Endheader === 'Endpunkte aktivieren')
    {
      this.Endheader = 'Endpunkte deaktivieren';
    }else {this.Endheader = 'Endpunkte aktivieren'; }
    this.showCalendar();
  }

  activateStartDate()
  {
    this.activatestart = !this.activatestart;
    this.showCalendar();
    if (this.Startheader === 'Startpunkte aktivieren')
    {
      this.Startheader = 'Startpunkte deaktivieren';
    }else {this.Startheader = 'Startpunkte aktivieren'; }
  }

  toggleBar()
  {
    this.activatebar = !this.activatebar;
    this.showCalendar();
    if ( this.Verlaufheader === 'Verlauf deaktivieren' )
    {
      this.Verlaufheader = 'Verlauf aktivieren';
    }else {this.Verlaufheader = 'Verlauf deaktivieren'; }
  }
  constructor() {
  }
  ngOnInit() {
    this.toggleBar();
    this.Wochenendeheader = 'Wochenende ausblenden';
    this.Verlaufheader = 'Verlauf deaktivieren';
    this.Startheader = 'Startpunkte aktivieren';
    this.Endheader = 'Endpunkte aktivieren';
  }

}
