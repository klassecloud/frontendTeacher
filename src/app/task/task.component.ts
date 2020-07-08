import { Component, OnInit, Input } from '@angular/core';
import {Task_Interface} from '../task-interface';
import { Tasks } from '../task-data';
import { TaskBacklog } from '../task-backlog-data';

import { Router } from '@angular/router';
import { StringArray } from '../stringArray';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

    // list of all the tasks, used to delete this task
    @Input() tasklist: Task_Interface[] = Tasks;

    @Input() task: Task_Interface;

    // is this task in the backlog
    backlog = false;

    stringArray: StringArray = { text: [], mode:[] }

    constructor(private router: Router) {}

    ngOnInit(): void {
        if(this.tasklist == TaskBacklog){
            this.backlog = true;
        }

        this.calculateKatex(this.task, this.stringArray);
    }

    /*
    Looks for \formel{ in the task.description
    if it finds the string, the description after it gets searched for the closing parenthesis
    when it finds it the string between the parenthesis of \formel{} is placed in the stringArray with mode 1
    text which is not between \formel{} is placed in the stringArray with mode 0
    */
    calculateKatex(task: Task_Interface, stringArray: StringArray) {
        var descriptionString = task.description;
        var index = descriptionString.indexOf("\\formel{");


        if(index<0){
            stringArray.text.push(task.description);
            stringArray.mode.push(0);
        }else {
            do{
                if(index != 0){
                    stringArray.text.push(descriptionString.substring(0,index));
                    stringArray.mode.push(0);
                }
                var substring = descriptionString.substring(index+8);

                var count = 1;
                var newIndex = substring.length;
                for(let i = 0; i < substring.length; i++){
                    if(substring[i] =='{')
                        count++;
                    else if(substring[i] == '}')
                        count--;

                    if(count == 0){
                        newIndex = i;
                        break;
                     }
                }

                stringArray.text.push(substring.slice(0, newIndex));
                stringArray.mode.push(1);

                descriptionString = substring.slice(newIndex+1);
                index = descriptionString.indexOf("\\formel{");
            }while(index > -1)

             if(descriptionString.length > 0)
                stringArray.text.push(descriptionString);
                stringArray.mode.push(0);
        }
    }

    edit(){
        this.router.navigateByUrl('/edittask/' + this.task.id);
    }

    delete(){
        // @Backend delete this task from its List
        this.tasklist.splice(this.tasklist.indexOf(this.tasklist.find(task => task.id === this.task.id)),1);
    }

    details() {
        this.router.navigateByUrl('/taskdetails/' + this.task.id);
    }

    assign(){
        // @Backend move this task from backlog to normal tasklist or vice versa
        Tasks.push(this.tasklist.find(task => task.id === this.task.id));
        this.delete();
    }

}
