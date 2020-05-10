import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/app/models/Person';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-modify-person-content',
  templateUrl: './modal-modify-person-content.component.html',
  styleUrls: ['./modal-modify-person-content.component.css']
})
export class ModalModifyPersonContentComponent implements OnInit {
  @Input() person:Person;
  name:string;
  
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.name = this.person.firstName + " " + this.person.lastName;
  }

  passBack(){
    this.activeModal.close(this.person);

  }

}
