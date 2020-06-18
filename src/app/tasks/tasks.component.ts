import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    @Input() title: string = "Title";
    @Input() subtitle: string = "Subtitle";
    @Input() content: string = "Content";


    constructor() { }

    ngOnInit(): void {
    }

    edit(){
        this.title = "kodas";
    }

}
