// Angular component core
import { Component, OnInit } from '@angular/core';

// Models
import { Task } from 'src/app/models/Task';
import { Person } from 'src/app/models/Person';

// Services
import { PersonService } from 'src/app/services/person.service';

// Modals
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThrowStmt } from '@angular/compiler';
import { ModalConfirmContentComponent } from '../../modals/modal-confirm-content/modal-confirm-content.component';

// Component Decorator
@Component({
  selector: 'app-main-persons',
  templateUrl: './main-persons.component.html',
  styleUrls: ['./main-persons.component.css']
})


/**
 * MainPersonsComponent Class
 * Used to control add-person component and list-persons-component,
 * call to api and popup messages.
 */
export class MainPersonsComponent implements OnInit {

  /**
   * constructor for the MainPersonsComponent class
   * @param modalService the service used to handle bootstrap modal
   */
  constructor(
    private personService: PersonService,
    private modalService: NgbModal
  ) { }

  // Fields
  persons:Person[];

  ngOnInit(): void {

    this.personService.getPersons().subscribe(persons => {

      // Callback function
      this.persons = persons;
    });
  }


  /**
   * Method used by the main component to add a person to the databse
   * using the PersonService
   * @param person the person to add
   */
  addPerson(person){
    var validMessage = this.isPersonValid(person)

    // If invalid
    if(validMessage.length > 20){
      const modalRef = this.modalService.open(ModalConfirmContentComponent);
      modalRef.componentInstance.object = validMessage;
    } else {

      // if valid
      this.personService.addPerson(person).subscribe(result => {
        // Success
        var msg = 'Person successfully added.';
        const modalRef = this.modalService.open(ModalConfirmContentComponent);
        modalRef.componentInstance.object = msg;
  
      }, error => {
        // Error
        var msg;
        if (error.error.msg !== undefined) {
          msg = error.error.msg;
        } else {
          msg = "Error adding the person, please try again.";
        }
        const modalRef = this.modalService.open(ModalConfirmContentComponent);
        modalRef.componentInstance.object = msg;
  
      });
    }
  }

  /**
 * Function used to validate if the field are present and correct.
 * @param { Person } person the person to validate.
 * @return 'A person requires a '. compare the total length > 20
 */
 isPersonValid(person) {
  var returnMessage = 'A person requires a ';
  if (!(person.firstName)) {
      returnMessage += 'first name,'
  }
  if (!(person.lastName)) {
      returnMessage += ' last name,'
  }
  if (!(person.birthDate)) {
      returnMessage += ' date of birth,'
  }
  if (!(person.email)) {
      returnMessage += ' email,'
  }
  if (!(person.phoneNumber)) {
      returnMessage += ' phone number.'
  }
  if (returnMessage.endsWith(',')) {
      returnMessage = returnMessage.slice(0, -1) + '.';
  }
  return returnMessage;
}

}
