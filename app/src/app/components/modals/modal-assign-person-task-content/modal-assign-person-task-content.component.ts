import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from 'src/app/models/Person';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-modal-assign-person-task-content',
  templateUrl: './modal-assign-person-task-content.component.html',
  styleUrls: ['./modal-assign-person-task-content.component.css']
})
export class ModalAssignPersonTaskContentComponent implements OnInit {
  @Input() tasks:Task[];
  @Input() person: Person;
  assignedTasks:Task[];
  constructor(
    public activeModal : NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.assignedTasks = [];
  }

  modifyAssignedTasks(task){
    if(this.assignedTasks.includes(task)){
      this.assignedTasks = this.assignedTasks.filter(t => t._id !== task._id);
    }
    else {
      this.assignedTasks.unshift(task);
    }
  }

  passBack() {
    this.activeModal.close(this.assignedTasks);
  }

}
