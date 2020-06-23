import { Component, OnInit, Input } from '@angular/core';
import {Task_Interface} from '../task-interface';
import { Tasks } from '../task-data';

import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

    @Input() task: Task_Interface;

    //title: string = "Title";
    //subtitle: string = "Subtitle";
    //content: string = "Content";

    constructor(private router: Router) {}

    ngOnInit(): void {
    }

    edit(){
        this.router.navigateByUrl('/edittask/' + this.task.id);
    }

    delete(){
        Tasks.splice(Tasks.indexOf(Tasks.find(task => task.id === this.task.id)),1);
    }

}
