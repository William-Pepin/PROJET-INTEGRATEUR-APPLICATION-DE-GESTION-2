import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-list-person-item',
  templateUrl: './list-person-item.component.html',
  styleUrls: ['./list-person-item.component.css']
})
export class ListPersonItemComponent implements OnInit {

  @Input() person: Person;

  // Output
  @Output() deletePerson: EventEmitter<Person> = new EventEmitter();
  @Output() modifyPerson: EventEmitter<Person> = new EventEmitter();
  @Output() assignTaskToPerson: EventEmitter<Person> = new EventEmitter();

  constructor(private personService: PersonService) { }

  age: number;

  ngOnInit(): void {
    this.calculateAge(this.person);
  }



  onModify(person) {
    this.modifyPerson.emit(person);
  }

  onAssign(person) {
    this.assignTaskToPerson.emit(person);
  }
  onDelete(person) {
    this.deletePerson.emit(person);
  }
  
  calculateAge(person){
    var birthDate = new Date(person.birthDate);
    var dif = Date.now() - birthDate.getTime();
    var ageDt = new Date(dif);


    this.age = Math.abs(ageDt.getUTCFullYear() - 1970);
  }
}
