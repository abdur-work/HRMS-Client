import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSystemComponent } from './leave-system.component';

describe('LeaveSystemComponent', () => {
  let component: LeaveSystemComponent;
  let fixture: ComponentFixture<LeaveSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
