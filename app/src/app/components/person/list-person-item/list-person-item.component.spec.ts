import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonItemComponent } from './list-person-item.component';

describe('ListPersonItemComponent', () => {
  let component: ListPersonItemComponent;
  let fixture: ComponentFixture<ListPersonItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPersonItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPersonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
