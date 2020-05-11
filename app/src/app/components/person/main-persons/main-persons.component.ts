// Angular component core
import { Component, OnInit } from '@angular/core';

// Models
import { Task } from 'src/app/models/Task';
import { Person } from 'src/app/models/Person';

// Services
import { PersonService } from 'src/app/services/person.service';
import { TaskService } from 'src/app/services/task.service';

// Modals
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalModifyPersonContentComponent } from '../../modals/modal-modify-person-content/modal-modify-person-content.component'
import { ModalConfirmContentComponent } from '../../modals/modal-confirm-content/modal-confirm-content.component';
import { ModalDeletePersonContentComponent } from '../../modals/modal-delete-person-content/modal-delete-person-content.component'
import { ModalAssignPersonTaskContentComponent } from '../../modals/modal-assign-person-task-content/modal-assign-person-task-content.component';
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
    private taskService: TaskService,
    private modalService: NgbModal
  ) { }

  // Fields
  persons: Person[];
  tasks: Task[];

  ngOnInit(): void {

    this.personService.getPersons().subscribe(persons => {

      // Callback function
      this.persons = persons;
    });

    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks)
  }


  /**
   * Method used by the main component to add a person to the databse
   * using the PersonService
   * @param person the person to add
   */
  addPerson(person: Person) {
    var validMessage = this.isPersonValid(person)
    console.log(validMessage);

    // If invalid
    if (validMessage.length > 17) {
      const modalRef = this.modalService.open(ModalConfirmContentComponent);
      modalRef.componentInstance.object = validMessage;
    } else {

      // if valid
      this.personService.addPerson(person).subscribe(result => {
        // Success
        var msg = 'Person successfully added.';
        const modalRef = this.modalService.open(ModalConfirmContentComponent);
        modalRef.componentInstance.object = msg;
        
        person._id = result.insertedId;
        this.persons.push(person);

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
   * Used to modify a person information
   * @param { Person } person : the person to modify
   */
  modifyPerson(person: Person) {

    // Show modify form in modal
    const modalRef = this.modalService.open(ModalModifyPersonContentComponent);
    modalRef.componentInstance.person = person;



    modalRef.result.then(result => {
      // if submitted
      if (result) {

        var validMessage = this.isPersonValid(person)

        // If invalid
        if (validMessage.length > 17) {
          const modalRef = this.modalService.open(ModalConfirmContentComponent);
          modalRef.componentInstance.object = validMessage;

        } else {
          this.personService.modifyPerson(person).subscribe(result => {
            // Success to modify

            var msg = 'Person successfully modified.';
            const modalConf = this.modalService.open(ModalConfirmContentComponent);
            modalConf.componentInstance.object = msg;

          }, error => {
            // Error to modify
            var msg;
            if (error.error.msg !== undefined) {
              msg = error.error.msg;
            } else {
              msg = "Error modifying the person, please try again.";
            }
            const modalConf = this.modalService.open(ModalConfirmContentComponent, msg);
            modalConf.componentInstance.object = msg;
          })
        }
      }
    });
  }


  /**
   * Method used to delete a person
   * @param person the person to delete
   */
  deletePerson(person: Person) {

    // Confirmation to delete
    const modalRef = this.modalService.open(ModalDeletePersonContentComponent);
    modalRef.componentInstance.person = person;

    modalRef.result.then(result => {

      // If confirmed
      this.personService.deletePerson(person._id).subscribe(result => {

        // Success
        var msg = 'Person successfully removed.';
        const modalConf = this.modalService.open(ModalConfirmContentComponent);
        modalConf.componentInstance.object = msg;

        // Update persons array
        this.persons = this.persons.filter(p => p._id != person._id);

      }, error => {

        // Error
        var msg = 'Error removing the person, please try again.';
        const modalConf = this.modalService.open(ModalConfirmContentComponent);
        modalConf.componentInstance.object = msg;
      })
    })

  }


  assignTaskToPerson(person: Person) {
    // Assign a task modal
    const modalRef = this.modalService.open(ModalAssignPersonTaskContentComponent);
    modalRef.componentInstance.person = person;
    modalRef.componentInstance.tasks = this.tasks

    modalRef.result.then(assignedTasks => {

      // Assign task
      this.personService.addPersonTasks(assignedTasks, person._id).subscribe(
        result => {
          // Success to assign all tasks
          // Delete from unassigned tasks
          assignedTasks.forEach(task => {
            this.taskService.deleteTask(task._id).subscribe();
            person.tasks.push(task);
            this.tasks = this.tasks.filter(t => t._id === task._id);
          });


          var msg = 'Tasks successfully assigned.';
          const modalConf = this.modalService.open(ModalConfirmContentComponent);
          modalConf.componentInstance.object = msg;

        },
        error => {
          // Error to assign task
          var msg;
          if (error.error.msg !== undefined) {
            msg = error.error.msg;
          } else {
            msg = "Error assigning the tasks, please try again.";
          }
          const modalConf = this.modalService.open(ModalConfirmContentComponent);
          modalConf.componentInstance.object = msg;
        }
      );
    })
  }

  /**
   * Function used to validate if the field are present and correct.
   * @param { Person } person the person to validate.
   * @return 'A person requires'
   */
  isPersonValid(person) {
    var returnMessage = 'A person requires';
    if (!(person.firstName)) {
      returnMessage += ' a first name,'
    }
    if (!(person.lastName)) {
      returnMessage += ' a last name,'
    }
    if (!(person.birthDate)) {
      returnMessage += ' a date of birth,'
    } else if (person.birthDate.getTime() > Date.now()) {
      returnMessage += ' a date of birth lower than the current date,'
    }

    if (!(person.email)) {
      returnMessage += ' an email,'
    }
    if (!(person.phoneNumber)) {
      returnMessage += ' a phone number.'
    }
    if (returnMessage.endsWith(',')) {
      returnMessage = returnMessage.slice(0, -1) + '.';
    }
    return returnMessage;
  }
}
