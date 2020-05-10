import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModifyPersonContentComponent } from './modal-modify-person-content.component';

describe('ModalModifyPersonContentComponent', () => {
  let component: ModalModifyPersonContentComponent;
  let fixture: ComponentFixture<ModalModifyPersonContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalModifyPersonContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModifyPersonContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
