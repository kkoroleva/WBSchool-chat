import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnreadsComponent } from './unread.component';

describe('RecentsComponent', () => {
  let component: UnreadsComponent;
  let fixture: ComponentFixture<UnreadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnreadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
