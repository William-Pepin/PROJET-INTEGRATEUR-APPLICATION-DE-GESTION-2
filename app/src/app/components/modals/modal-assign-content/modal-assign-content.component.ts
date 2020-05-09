import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from 'src/app/models/Person';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-modal-assign-content',
  templateUrl: './modal-assign-content.component.html',
  styleUrls: ['./modal-assign-content.component.css']
})
export class ModalAssignContentComponent implements OnInit {
  @Input() task:Task;
  @Input() persons: Person[];
  person_id: string;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  passBack() {
    this.task.person_id = this.person_id;
    this.activeModal.close(this.task);
  }



}
