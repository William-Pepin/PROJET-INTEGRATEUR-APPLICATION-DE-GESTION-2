import { Component, OnInit } from '@angular/core';

import { Task } from 'src/app/models/Task';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';
import { TaskService  } from 'src/app/services/task.service';


@Component({
  selector: 'app-main-tasks',
  templateUrl: './main-tasks.component.html',
  styleUrls: ['./main-tasks.component.css']
})
export class MainTasksComponent implements OnInit {

  constructor(private taskService:TaskService, private personService:PersonService) { }

  // Unassigned Task
  tasks:Task[];
  persons:Person[];

  ngOnInit(): void {

    // Get all tasks from service / api
    this.taskService.getTasks().subscribe(tasks => {
      // callback function
      this.tasks = tasks;
    });

    this.personService.getPersons().subscribe(persons => {
      // callback function
      this.persons = persons;
    });

  }

  

}
