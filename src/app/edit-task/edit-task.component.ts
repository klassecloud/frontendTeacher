import {Component, Input, OnInit} from '@angular/core';
import {Task_Interface} from '../task-interface';
import {Observable} from 'rxjs';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {Tasks} from '../task-data';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  @Input() task: Task_Interface = {
    id: 0,
    name: 'Aufgabenname',
    description:  'Aufgabenbeschreibung',
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
  url = 'http://file.io'; // TODO change to the backend server

  percentCompleted = 0;

  handleFileInput(filename) {
    const that = this;
    const fileToUpload = (document.getElementById(filename) as HTMLInputElement).files; // get the file from
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

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
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
    if (this.task.id === 0){
        this.task.id = Tasks[Tasks.length - 1].id + 1;
        Tasks.push(this.task);
    }
    this.router.navigateByUrl('tasklist');
    // TODO save 'task' on the backend.
  }
}
