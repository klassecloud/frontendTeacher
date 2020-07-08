import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule} from '@angular/common/http';

import { TaskComponent } from './task/task.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TaskListComponent } from './task-list/task-list.component';

import { EditTaskComponent } from './edit-task/edit-task.component';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { KatexModule } from 'ng-katex';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { KatexInputComponent } from './katex-input/katex-input.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import 'date-input-polyfill';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent,
    EditTaskComponent,
    CalendarComponent,
    TaskDetailsComponent,
    KatexInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    KatexModule,
    NoopAnimationsModule,
    FullCalendarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
