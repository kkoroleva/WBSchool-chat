import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavmobileComponent } from './nav-mobile.component';

describe('NavbuttomComponent', () => {
  let component: NavmobileComponent;
  let fixture: ComponentFixture<NavmobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavmobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavmobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
