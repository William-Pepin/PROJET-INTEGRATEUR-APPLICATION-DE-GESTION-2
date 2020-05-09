import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmContentComponent } from './modal-confirm-content.component';

describe('ModalConfirmContentComponent', () => {
  let component: ModalConfirmContentComponent;
  let fixture: ComponentFixture<ModalConfirmContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConfirmContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
