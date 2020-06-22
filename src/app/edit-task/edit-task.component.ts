import { Component, OnInit, Input } from '@angular/core';
import {Task_Interface} from '../task-interface';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Input() task: Task_Interface = {
    name: 'Aufgabenname',
    description:  'Aufgabenbeschreibung',
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }
  delete() {}
  archive() {}
  save() {}
  preview() {}

}
