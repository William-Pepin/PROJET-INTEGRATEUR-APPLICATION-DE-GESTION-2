import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';

import { AddPersonComponent } from './components/person/add-person/add-person.component';
import { ListPersonsComponent } from './components/person/list-persons/list-persons.component';
import { ListPersonItemComponent } from 'src/app/components/person/list-person-item/list-person-item.component';


// Newly added module here
import { HttpClientModule } from '@angular/common/http'; // Used for services
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from './components/task/add-task/add-task.component';
import { TaskItemComponent } from './components/task/task-item/task-item.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { AboutComponent } from './components/pages/about/about.component';
import { MainPersonsComponent } from './components/person/main-persons/main-persons.component';
import { MainTasksComponent } from './components/task/main-tasks/main-tasks.component';
import {ListTasksComponent } from './components/task/list-tasks/list-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AddPersonComponent,
    AddTaskComponent,
    TaskItemComponent,
    ListPersonsComponent,
    ListPersonItemComponent,
    DashboardComponent,
    AboutComponent,
    MainPersonsComponent,
    MainTasksComponent,
    ListTasksComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
