import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbuttomComponent } from './navbuttom.component';

describe('NavbuttomComponent', () => {
  let component: NavbuttomComponent;
  let fixture: ComponentFixture<NavbuttomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbuttomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbuttomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
