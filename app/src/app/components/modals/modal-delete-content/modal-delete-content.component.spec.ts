import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteContentComponent } from './modal-delete-content.component';

describe('ModalDeleteContentComponent', () => {
  let component: ModalDeleteContentComponent;
  let fixture: ComponentFixture<ModalDeleteContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
