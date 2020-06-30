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

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: true, // initial value
    events: [
      // { title: this.tasks[0].name, color: 'purple', date: '2020-06-06'},
      { title: 'Hausaufgabe: Nummerische Mathematik', date: '2020-06-06', color: 'purple', start: new Date('2020-06-05'), end: new Date('2020-06-09') },
      { title: 'Vorlesung Nummerische Mathematik', date: '2020-06-05T19:20+01:00', color: 'red' },
      { title: 'Vorlesung Nummerische Mathematik', date: '2020-06-10T19:20+01:00', color: 'red' },
    ]
  };

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }

  constructor() {
  }

  ngOnInit() {
    this.tasks = Tasks;
  }

}
