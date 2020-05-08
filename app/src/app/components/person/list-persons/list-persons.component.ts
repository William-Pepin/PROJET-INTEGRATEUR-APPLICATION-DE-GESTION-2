import { Component, OnInit } from '@angular/core';

import { Task } from 'src/app/models/Task';
import { Person } from 'src/app/models/Person';

import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-list-persons',
  templateUrl: './list-persons.component.html',
  styleUrls: ['./list-persons.component.css']
})
export class ListPersonsComponent implements OnInit {

  persons:Person[];

  constructor(private personService:PersonService) { }

  ngOnInit(): void {
    this.personService.getPersons().subscribe( persons => {
      this.persons = persons;
    });
  }


}
