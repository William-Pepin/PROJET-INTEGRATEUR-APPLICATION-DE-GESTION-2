import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/models/Task';


@Component({
  selector: 'app-modal-delete-content',
  templateUrl: './modal-delete-content.component.html',
  styleUrls: ['./modal-delete-content.component.css']
})
export class ModalDeleteContentComponent implements OnInit {

  @Input() object:Task;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  passBack(){

    this.activeModal.close(this.object);

  }

}
