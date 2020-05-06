// Adding EventEmitter and Output to Emit back to the service.
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

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


  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Method used when to button is clicked.
   * It creates a person and emit it to the component above him
   */
  onSubmit() {
    // Define person constant
    const person = {
      lastName: this.lastName,
      firstName: this.firstName,
      birthDate: new Date(this.birthDate),
      email: this.email,
      phoneNumber: this.phoneNumber
    }

    // Emit the addPerson emitter with the newly made person.
    this.addPerson.emit(person);
  }

}
