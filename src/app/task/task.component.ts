import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

    @Input() title: string = "Title";
    @Input() subtitle: string = "Subtitle";
    @Input() content: string = "Content";


    constructor() { }

    ngOnInit(): void {
    }

    edit(){
    }

}
