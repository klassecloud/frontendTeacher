import { Component, OnInit } from '@angular/core';
import {Task_Interface} from '../task-interface';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  task: Task_Interface = {
    name: "Aufgabenname",
    description:  "Aufgabenbeschreibung",
    estimated_effort: "4 Stunden",
    start: new Date(),
    end: new Date()
  };
  constructor() { }

  ngOnInit(): void {
  }

}
