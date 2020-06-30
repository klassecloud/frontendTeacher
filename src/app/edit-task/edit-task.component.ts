import { Component, OnInit, Input } from '@angular/core';
import {Task_Interface} from '../task-interface';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse, HttpEventType } from '@angular/common/http';
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
    materials: {},
    modelSolution: {}
  };

  preview: Boolean = false;
  url = 'http://file.io'; // 'localhost:3001';


  showKatexInput: boolean = false;

  input: HTMLInputElement;

  headerConf;

  percentCompleted = 0;



  handleFileInput(filename) {
    const that = this;
    const fileToUpload = (filename === 'materials') ?
      (document.getElementById('materials') as HTMLInputElement).files :
      (document.getElementById('modelSolution') as HTMLInputElement).files;
    console.log(fileToUpload);
    if (fileToUpload.length > 0) {
      const file = fileToUpload.item(0);
      const formData = new FormData();
      formData.append('file', file);
      this.uploadWithProgress(formData).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentCompleted = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          that.task[filename][file.name] = event.body.link;
        }
      });
    }
  }

  uploadWithProgress(formData: FormData): Observable<any> {
    const uploadfile = this.http.post(this.url, formData, { observe: 'events',  reportProgress: true });
    return uploadfile;
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // get the task with id from the url from our task list
    this.input = document.getElementById("input") as HTMLInputElement;
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
        this.task = Tasks.find(task => task.id === id);
    }

  }
  activatePreview(){
    console.log(this.task.materials);
    console.log(this.task.modelSolution);
    this.preview = true;
  }

  deactivatePreview(){
    this.preview = false;
  }

  delete() {}
  archive() {}
  save() {
    this.handleFileInput('materials');
    this.handleFileInput('modelSolution');
    if(this.task.id == 0){
        if(Tasks.length>0)
            this.task.id = Tasks[Tasks.length-1].id + 1;
        else this.task.id = 1;
        Tasks.push(this.task);
    }
    this.router.navigateByUrl('tasklist');
  }

  showKatex() {
    this.showKatexInput ? this.showKatexInput=false : this.showKatexInput=true;
  }

}
