import { Component, OnInit, Input } from '@angular/core';
import {Task_Interface} from '../task-interface';
import { Tasks } from '../task-data';
import { TaskBacklog } from '../task-backlog-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: Task_Interface[] = [];

  toolbarName:string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.router.url);

    // use Backlog list if url is backlog
    if(this.router.url == "/backlog"){
        // @Backend load Backlog list of tasks
        this.tasks = TaskBacklog;
        this.toolbarName = "Backlog";
    }else{
        // @Backend load normal list of tasks
        this.tasks = Tasks;
        this.toolbarName = "Aufgabenliste";
    }
  }

}
