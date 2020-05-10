import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from 'src/app/models/Person';

@Component({
  selector: 'app-modal-delete-person-content',
  templateUrl: './modal-delete-person-content.component.html',
  styleUrls: ['./modal-delete-person-content.component.css']
})
export class ModalDeletePersonContentComponent implements OnInit {
  @Input() person:Person;
  constructor(
    public activeModal:NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  passBack(){
    this.activeModal.close(this.person);
  }

}
