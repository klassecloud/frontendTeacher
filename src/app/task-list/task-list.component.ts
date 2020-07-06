import { Component, OnInit, Input } from '@angular/core';
import {Task_Interface} from '../task-interface';
import { Tasks } from '../task-data';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: Task_Interface[] = [];


  constructor() { }

  ngOnInit(): void {
    this.tasks = Tasks;
  }

}
