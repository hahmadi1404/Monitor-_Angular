import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockJoeComponent } from './clock-joe.component';

describe('ClockJoeComponent', () => {
  let component: ClockJoeComponent;
  let fixture: ComponentFixture<ClockJoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockJoeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockJoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
