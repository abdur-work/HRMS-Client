import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrateChatComponent } from './genrate-chat.component';

describe('GenrateChatComponent', () => {
  let component: GenrateChatComponent;
  let fixture: ComponentFixture<GenrateChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenrateChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenrateChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
