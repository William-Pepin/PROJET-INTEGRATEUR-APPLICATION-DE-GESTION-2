import { Component, OnInit, Input, ɵConsole } from '@angular/core';

import { Task } from 'src/app/models/Task';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';
import { TaskService } from 'src/app/services/task.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmContentComponent } from '../../modals/modal-confirm-content/modal-confirm-content.component';
import { ModalDeleteContentComponent } from '../../modals/modal-delete-content/modal-delete-content.component';



@Component({
  selector: 'app-main-tasks',
  templateUrl: './main-tasks.component.html',
  styleUrls: ['./main-tasks.component.css']
})
export class MainTasksComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private personService: PersonService,
    private modalService: NgbModal) { }

  // Unassigned Task
  tasks: Task[];
  persons: Person[];
  modalRef: NgbModal;




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



  /**
   * Method that push a task to the database using the API
   * And show a popup message to the user.
   * Called using the EventEmitter from the add-task component
   * @param task task to add
   */
  addTask(task: Task) {
    var person_id = task.person_id;
    delete task.person_id;

    // Push to Tasks collection which are undefined tasks
    if (person_id === undefined || person_id === 'undefined') {
      this.taskService.addTask(task).subscribe
        (result => {
          // Success
          var msg = "Task successfully added.";
          // Push to screen.
          this.openModal(ModalConfirmContentComponent, msg);

          // Push to tasks array
          this.tasks.push(task);



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
          var msg = 'Task sucessfully added.';
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




  /**
   * Method to delete a task from the database.
   * add a popup to confirm the deletion.
   * @param task task to delete
   */
  deleteTask(task: Task) {

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



  openModal(ModalConfirmContentComponent, object?) {
    const modalRef = this.modalService.open(ModalConfirmContentComponent);
    modalRef.componentInstance.object = object;
    return modalRef;

  }
}