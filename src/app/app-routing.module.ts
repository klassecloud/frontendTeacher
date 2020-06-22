import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

const routes: Routes = [
{path: '', redirectTo: "tasklist", pathMatch: 'full'},
{path: 'tasklist', component: TaskListComponent},
{path: 'newtask', component: EditTaskComponent},
{path: 'edittask/:id', component: EditTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
