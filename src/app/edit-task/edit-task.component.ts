import { Component, OnInit, Input } from '@angular/core';
import {Task_Interface} from '../task-interface';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tasks } from '../task-data';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})

export class EditTaskComponent implements OnInit {
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
    model_solution: undefined
  };

  fileToUpload: File = null;

  showKatexInput: boolean = false;

  input: HTMLInputElement;

  headerConf;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  /*
  uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
    }, error => {
      console.log(error);
    });
  }
  */

  postFile(fileToUpload: File): Observable<Object> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http
      .post(endpoint, formData, { headers: this.headerConf });
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // get the task with id from the url from our task list
    this.input = document.getElementById("input") as HTMLInputElement;
    const id = +this.route.snapshot.paramMap.get('id');
    if(id>0)
        this.task = Tasks.find(task => task.id === id);

  }
  delete() {}
  archive() {}
  save() {
    if(this.task.id == 0){
        if(Tasks.length>0)
            this.task.id = Tasks[Tasks.length-1].id + 1;
        else this.task.id = 1;
        Tasks.push(this.task);
    }
    this.router.navigateByUrl('tasklist');
  }
  preview() {}

  showKatex() {
    this.showKatexInput ? this.showKatexInput=false : this.showKatexInput=true;
  }

}
