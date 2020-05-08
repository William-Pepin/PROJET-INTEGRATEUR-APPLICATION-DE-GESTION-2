import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPersonsComponent } from './main-persons.component';

describe('MainPersonsComponent', () => {
  let component: MainPersonsComponent;
  let fixture: ComponentFixture<MainPersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
