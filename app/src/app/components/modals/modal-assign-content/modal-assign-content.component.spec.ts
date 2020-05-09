import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssignContentComponent } from './modal-assign-content.component';

describe('ModalAssignContentComponent', () => {
  let component: ModalAssignContentComponent;
  let fixture: ComponentFixture<ModalAssignContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAssignContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAssignContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
