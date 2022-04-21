import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrivateChatComponent } from './create-private-chat.component';

describe('CreatePrivateChatComponent', () => {
  let component: CreatePrivateChatComponent;
  let fixture: ComponentFixture<CreatePrivateChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePrivateChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrivateChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
