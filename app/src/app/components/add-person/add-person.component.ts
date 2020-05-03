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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    // Define person constant
    const person = {
      lastName: this.lastName,
      fistName: this.firstName
    }

    // Emit the addPerson emitter with the newly made person.
    this.addPerson.emit(person);
  }

}
