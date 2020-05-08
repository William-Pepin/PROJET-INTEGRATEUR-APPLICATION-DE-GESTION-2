import { Component, OnInit, Input, ɵConsole } from '@angular/core';

import { Task } from 'src/app/models/Task';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';
import { TaskService } from 'src/app/services/task.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-main-tasks',
  templateUrl: './main-tasks.component.html',
  styleUrls: ['./main-tasks.component.css']
})
export class MainTasksComponent implements OnInit {

  constructor(private taskService: TaskService, private personService: PersonService, private modalService: NgbModal) { }

  // Unassigned Task
  tasks: Task[];
  persons: Person[];


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
          this.sendModal(msg);


        }, error => {
          // Error
          var msg;
          if (error.error.msg !== undefined) {
            msg = error.error.msg;
          } else {
            msg = "Error adding the task, please try again.";
          }
          this.sendModal(msg);
        })
    }
    // Push task to a person
    else {
      this.personService.addPersonTask(task, person_id).subscribe
        (result => {
          // Success
          var msg = 'Task sucessfully added.';
          this.sendModal(msg);


        }, error => {
          // Error
          var msg;
          if (error.error.msg !== undefined) {
            msg = error.error.msg;
          } else {
            msg = "Error adding the task, please try again.";
          }
          this.sendModal(msg);
        })
    }
  }
  sendModal(msg: string) {
    // Push to screen.
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.msg = msg;
  }
}


/**
 * 
 * 
 */
@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ msg }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-footer">
      <button type="button" ngbAutofocus class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() msg;

  constructor(public activeModal: NgbActiveModal) { }
}
