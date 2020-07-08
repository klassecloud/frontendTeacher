import { Component, OnInit, Input } from '@angular/core';
import { Tasks } from '../task-data';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {Task_Interface} from '../task-interface';
import {TaskComponent} from '../task/task.component';
import { StringArray } from '../stringArray';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

    taskc: TaskComponent = new TaskComponent(this.router);

    @Input() task: Task_Interface = {
        id: 0,
        name: 'Aufgabenname',
        description: 'Aufgabenbeschreibung',
        estimated_effort: '4 Stunden',
        start: new Date(),
        end: new Date(),
        previousTask: undefined,
        allocate: ['9b', '9a', 'Verena Steinmeier'],
        subject: undefined,
        materials: undefined,
        uebung: true,
        modelSolution: undefined
    };

    stringArray: StringArray = { text: [], mode: [] };


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
        this.task = Tasks.find(task => task.id === id);
    }

    this.taskc.calculateKatex(this.task, this.stringArray);
  }

  edit(){
    this.router.navigateByUrl('/edittask/' + this.task.id);
  }

  delete(){
    Tasks.splice(Tasks.indexOf(Tasks.find(task => task.id === this.task.id)), 1);
    this.router.navigateByUrl('/tasklist');
  }

}
