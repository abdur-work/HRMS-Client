import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnnouncmentComponent } from './add-announcment.component';

describe('AddAnnouncmentComponent', () => {
  let component: AddAnnouncmentComponent;
  let fixture: ComponentFixture<AddAnnouncmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnnouncmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnnouncmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
