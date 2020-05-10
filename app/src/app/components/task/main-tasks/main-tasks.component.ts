// Angular component core
import { Component, OnInit } from '@angular/core';

// Models
import { Task } from 'src/app/models/Task';
import { Person } from 'src/app/models/Person';

// Services
import { PersonService } from 'src/app/services/person.service';
import { TaskService } from 'src/app/services/task.service';

// Modals
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmContentComponent } from '../../modals/modal-confirm-content/modal-confirm-content.component';
import { ModalDeleteContentComponent } from '../../modals/modal-delete-content/modal-delete-content.component';
import { ModalAssignContentComponent } from '../../modals/modal-assign-content/modal-assign-content.component';


// Component Decorator
@Component({
  selector: 'app-main-tasks',
  templateUrl: './main-tasks.component.html',
  styleUrls: ['./main-tasks.component.css']
})


/**
 * MainTasksComponent class
 * used to control add-task-component and lists-task-component
 */
export class MainTasksComponent implements OnInit {

  constructor(
    // Adding services in constructor
    private taskService: TaskService,
    private personService: PersonService,
    private modalService: NgbModal) { }

  // Fields
  tasks: Task[]; // Unnassigned task only
  persons: Person[];



  ngOnInit(): void {

    // Get all unnassigned tasks from service / api
    this.taskService.getTasks().subscribe(tasks => {
      // callback function
      this.tasks = tasks;
    });

    // Get all persons from service / api
    this.personService.getPersons().subscribe(persons => {
      // callback function
      this.persons = persons;
    });

  }



  /**
   * Method that push a task to the database using the API
   * And show a popup message to the user.
   * Called using the EventEmitter from the add-task component
   * @param task task to add
   */
  addTask(task: Task) {
    var person_id = task.person_id;
    delete task.person_id;

    var validMessage = this.isTaskValid(task)

    if (validMessage.length > 18) {
      // Client validation false
      const modalRef = this.modalService.open(ModalConfirmContentComponent);
      modalRef.componentInstance.object = validMessage;
    } else {
      // Success
      // Push to Tasks collection which are undefined tasks
      if (person_id === undefined || person_id === 'undefined') {
        this.taskService.addTask(task).subscribe
          (result => {
            // Success
            var msg = "Task successfully added.";
            // Push to screen.
            this.openModal(ModalConfirmContentComponent, msg);

            // Push to tasks array at first position
            this.tasks.unshift(task);



          }, error => {
            // Error
            var msg;
            if (error.error.msg !== undefined) {
              msg = error.error.msg;
            } else {
              msg = "Error adding the task, please try again.";
            }
            this.openModal(ModalConfirmContentComponent, msg);
          })
      }

      // Push task to a person
      else {
        this.personService.addPersonTask(task, person_id).subscribe
          (result => {
            // Success
            var msg = 'Task successfully added.';
            this.openModal(ModalConfirmContentComponent, msg);

          }, error => {
            // Error
            var msg;
            if (error.error.msg !== undefined) {
              msg = error.error.msg;
            } else {
              msg = "Error adding the task, please try again.";
            }
            this.openModal(ModalConfirmContentComponent, msg);
          })
      }
    }

  }



  /**
   * Method used to assign a task to a person
   * Removes the task of the assigned tasks collections
   * @param task task to assign
   */
  assignTask(task: Task) {

    // Show select form in modal
    const modalRef = this.modalService.open(ModalAssignContentComponent);
    modalRef.componentInstance.task = task;
    modalRef.componentInstance.persons = this.persons;


    // If submitted
    modalRef.result.then(result => {


      if (result) {
        if (task.person_id === undefined || task.person_id === 'undefined') {
          // If no choice was made.
          return;
        }
        var person_id = task.person_id;
        delete task.person_id;

        this.personService.addPersonTask(task, person_id).subscribe
          (result => {
            // Success to assign the task
            this.taskService.deleteTask(task._id).subscribe(result => {

              // Success to delete the task
              var msg = 'Task sucessfully assigned.';
              this.openModal(ModalConfirmContentComponent, msg);

              // Return all tasks that doesn't have the ID of the current task (iteration for each task as t)
              this.tasks = this.tasks.filter(t => t._id !== task._id);


            }, error => {
              // If error causing duplicates in database
              var msg = 'Task sucessfully assigned, but failed to delete in the unnassigned tasks.';
              this.openModal(ModalConfirmContentComponent, msg);
            })
          }, error => {
            // Error
            var msg;
            if (error.error.msg !== undefined) {
              msg = error.error.msg;
            } else {
              msg = "Error assigning the task, please try again.";
            }
            this.openModal(ModalConfirmContentComponent, msg);
          })

      }

    })
  }



  /**
   * Method to delete a task from the database.
   * add a popup to confirm the deletion.
   * @param task task to delete
   */
  deleteTask(task: Task) {

    // Confirmation to delete.
    var modalRef = this.openModal(ModalDeleteContentComponent, task);

    modalRef.result.then(result => {
      if (result) {


        // Confirm you want to delete the task
        this.taskService.deleteTask(task._id).subscribe(result => {

          // Success
          var msg = "Task successfully removed.";
          // Push to screen.
          this.openModal(ModalConfirmContentComponent, msg);

          // Return all tasks that doesn't have the ID of the current task (iteration for each task as t)
          this.tasks = this.tasks.filter(t => t._id !== task._id);

        }, error => {

          // Error
          var msg = "Error removing the task, please try again.";
          this.openModal(ModalConfirmContentComponent, msg);
        });
      }
    });
  }


  /**
   * Method used to open simple modal using an object
   * @param ModalContentComponent Modal to open
   * @param object object to give to the modal (optional)
   */
  openModal(ModalContentComponent, object?) {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.object = object;
    return modalRef;

  }



  /**
   * Used to validate a task
   * 
   * @param {*} task the task to validate
   */
  isTaskValid(task) {
    var returnMessage = 'A task requires a ';
    if (!(task.title)) {
      returnMessage += 'title,';
    }
    if (!(task.description)) {
      returnMessage += ' description.';
    }
    if (returnMessage.endsWith(',')) {
      returnMessage = returnMessage.slice(0, -1) + '.';

    }
    return returnMessage;
  }
}