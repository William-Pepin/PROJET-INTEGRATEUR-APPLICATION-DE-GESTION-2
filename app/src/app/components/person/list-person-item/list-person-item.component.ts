import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Person } from 'src/app/models/Person';
import { Task } from 'src/app/models/Task';
import { PersonService } from 'src/app/services/person.service';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

@Component({
  selector: 'app-list-person-item',
  templateUrl: './list-person-item.component.html',
  styleUrls: ['./list-person-item.component.css']
})
export class ListPersonItemComponent implements OnInit {

  @Input() person: Person;

  @Output() deletePerson: EventEmitter<Person> = new  EventEmitter();

  @Output() modifyPerson: EventEmitter<Person> = new EventEmitter();

  constructor(private personService:PersonService) { }

  ngOnInit(): void {
  }



  onModify(person){
    this.modifyPerson.emit(person);
  }



  onDelete(person){
    this.deletePerson.emit(person);
  }

}
