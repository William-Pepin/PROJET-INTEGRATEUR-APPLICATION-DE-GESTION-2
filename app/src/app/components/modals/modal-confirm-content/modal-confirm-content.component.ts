import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm-content',
  templateUrl: './modal-confirm-content.component.html',
  styleUrls: ['./modal-confirm-content.component.css']
})
export class ModalConfirmContentComponent implements OnInit {
  @Input() object;

  constructor(
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
