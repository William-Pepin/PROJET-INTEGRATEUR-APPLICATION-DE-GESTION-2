import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from 'src/app/components/pages/about/about.component';
import { MainPersonsComponent } from 'src/app/components/person/main-persons/main-persons.component';
import { MainTasksComponent } from 'src/app/components/task/main-tasks/main-tasks.component';
;
// Routes
const routes: Routes = [
  { path: '', component: MainPersonsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'persons', component: MainPersonsComponent },
  { path: 'tasks', component: MainTasksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
