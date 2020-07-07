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
  enddate = false;

  // @ts-ignore
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: true, // initial value
    events: [],
  };

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
  }
  toggleEndDate()
  {
    this.tasks = Tasks;
    const name = [];
    const start = [];
    const end = [];
    const color = [];
    for (let index = 0; index < this.tasks.length; index++)
    {
      if (this.enddate) {
        name.push('Abgabe: ' + Tasks[index].name);
        start.push(Tasks[index].end);
      }
      else {
        name.push(Tasks[index].name);
        start.push(Tasks[index].start);
      }
      end.push(Tasks[index].end);
      if (Tasks[index].uebung) {
        color.push('green');
      }
      else { color.push('purple'); }
    }
    const newEvents = [];
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.tasks.length; index++)
    {
        newEvents.push({ title: name.pop(), color: color.pop(), start: start.pop(), end: end.pop() });
    }
    this.calendarOptions.events = newEvents;
    this.enddate = !this.enddate;
  }
  constructor() {
  }
  ngOnInit() {
    this.toggleEndDate();
  }

}
