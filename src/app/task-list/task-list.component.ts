import { Component, OnInit, Input } from '@angular/core';
import {Task_Interface} from '../task-interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: Task_Interface[] = [];

  task: Task_Interface = {
    name: 'Aufgabe 1',
    description:  'Aufgabenbeschreibung',
    estimated_effort: '4 Stunden',
    start: new Date(),
    end: new Date(),
    previousTask: undefined,
    allocate: ['9b', '9a', 'Verena Steinmeier'],
    subject: undefined,
    materials: undefined,
    model_solution: undefined
  };

  task2: Task_Interface = {
      name: 'Aufgabe 2',
      description:  'Aufgabenbeschreibung amnslkmd aäskldm lakdsm ääkadsm aklsdmaskd maklösdäm äaksdm alkdm alkd',
      estimated_effort: '8 Stunden',
      start: new Date(),
      end: new Date(),
      previousTask: undefined,
      allocate: ['9b', '9a', 'Verena Steinmeier'],
      subject: undefined,
      materials: undefined,
      model_solution: undefined
    };

  constructor() { }

  ngOnInit(): void {
    this.tasks.push(this.task);
    this.tasks.push(this.task);
    this.tasks.push(this.task);
    this.tasks.push(this.task);
    this.tasks.push(this.task2);
  }

}
