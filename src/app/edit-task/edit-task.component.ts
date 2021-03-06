import {Component, Input, OnInit} from '@angular/core';
import {Task_Interface} from '../task-interface';
import {Observable} from 'rxjs';
import { TaskBacklog } from '../task-backlog-data';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {Tasks} from '../task-data';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  task: Task_Interface = {
    id: 0,
    name: 'Aufgabenname',
    description: 'Aufgabenbeschreibung',
    estimated_effort: 'X Stunden',
    start: new Date(),
    end: new Date(),
    previousTask: undefined,
    allocate: [],
    subject: undefined,
    materials: {},
    modelSolution: {},
    uebung: true,
  };

  public buttonheader: string;


  preview: Boolean = false;
  url = 'http://file.io'; // TODO change to the backend server


  showKatexInput = false;

  input: HTMLInputElement;

  percentCompleted = 0;

  // should the task be in our backlog
  backlog = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // get the task with id from the url from our task list
    this.input = document.getElementById('input') as HTMLInputElement;
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
        this.task = Tasks.find(task => task.id === id);
    }
    if (this.task.uebung)
    {
      this.buttonheader = 'Übung';
    }
    else {this.buttonheader = 'Vorlesung'; }

  }


  handleFileInput(filename) {
    const that = this;

    const fileToUpload = (document.getElementById(filename) as HTMLInputElement).files; // get the file from the form
    if (fileToUpload.length > 0) {
      const file = fileToUpload.item(0);
      const formData = new FormData();
      formData.append('file', file); // format to upload to file io
      this.uploadWithProgress(formData).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentCompleted = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          that.task[filename][file.name] = event.body.link; // save the URL from the file.
        }
      });
    }
  }

  uploadWithProgress(formData: FormData): Observable<any> {
    return this.http.post(this.url, formData, {observe: 'events', reportProgress: true});
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

    //this.handleFileInput('materials');
    //this.handleFileInput('modelSolution:');

    // @Backend save the new or changed task to our tasklist or backlog
    var list = Tasks;
    if(this.backlog)
        list = TaskBacklog;

    if (this.task.id === 0) {
        if (list.length > 0) {
            this.task.id = list[list.length - 1].id + 1;
        } else {
            this.task.id = 1;
        }
        list.push(this.task);
    }else {
        list[list.indexOf(list.find(task => task.id === this.task.id))] = this.task;
    }

    this.router.navigateByUrl('tasklist');
    // TODO save 'task' on the backend.
  }
  showKatex()
  {
    this.showKatexInput ? this.showKatexInput = false : this.showKatexInput = true;
  }

  toggleUebung()
  {
    this.task.uebung = !this.task.uebung;
    if (this.buttonheader === 'Übung')
    {
      this.buttonheader = 'Vorlesung';
    }
    else {
      this.buttonheader = 'Übung';
    }
  }
}
