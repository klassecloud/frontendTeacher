import { Component, OnInit, Input } from '@angular/core';
import {Task_Interface} from '../task-interface';

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

    constructor() { }

    ngOnInit(): void {
    }

    edit(){

    }

}
