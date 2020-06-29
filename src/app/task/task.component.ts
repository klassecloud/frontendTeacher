import { Component, OnInit, Input } from '@angular/core';
import {Task_Interface} from '../task-interface';
import { Tasks } from '../task-data';

import { Router } from '@angular/router';
import { StringArray } from '../stringArray';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

    @Input() task: Task_Interface;

    stringArray: StringArray = { text: [], mode:[] }

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.calculateKatex(this.task, this.stringArray);
    }

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
            }while(index > 0)

             if(descriptionString.length > 0)
                stringArray.text.push(descriptionString);
                stringArray.mode.push(0);
        }
    }

    edit(){
        this.router.navigateByUrl('/edittask/' + this.task.id);
    }

    delete(){
        Tasks.splice(Tasks.indexOf(Tasks.find(task => task.id === this.task.id)),1);
    }

    details() {
        this.router.navigateByUrl('/taskdetails/' + this.task.id);
    }

}
