import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssignPersonTaskContentComponent } from './modal-assign-person-task-content.component';

describe('ModalAssignPersonTaskContentComponent', () => {
  let component: ModalAssignPersonTaskContentComponent;
  let fixture: ComponentFixture<ModalAssignPersonTaskContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAssignPersonTaskContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAssignPersonTaskContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
