// Adding EventEmitter and Output to Emit back to the service.
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/models/Person';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  // EventEmitter as an ouput
  @Output() addPerson: EventEmitter<any> = new EventEmitter();

  // Property for form input.
  lastName: string;
  firstName: string;
  birthDate: Date;
  email: string;
  phoneNumber: string;
  person: Person;


  constructor(private personService:PersonService) { }

  ngOnInit(): void {
  }

  /**
   * Method used when to button is clicked.
   * It creates a person and emit it to the component above him
   */
  onSubmit() {
    this.person = new Person();
    // Define person constant
    this.person.firstName = this.firstName;
    this.person.lastName = this.lastName;
    this.person.birthDate = this.birthDate;
    this.person.email = this.email;
    this.person.phoneNumber = this.phoneNumber
    // Emit the addPerson emitter with the newly made person.
    this.personService.addPerson(this.person).subscribe();
  }

}
