import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletePersonContentComponent } from './modal-delete-person-content.component';

describe('ModalDeletePersonContentComponent', () => {
  let component: ModalDeletePersonContentComponent;
  let fixture: ComponentFixture<ModalDeletePersonContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeletePersonContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeletePersonContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
