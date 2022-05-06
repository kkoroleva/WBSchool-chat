import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWindowImgComponent } from './modal-window-img.component';

describe('ModalWindowImgComponent', () => {
  let component: ModalWindowImgComponent;
  let fixture: ComponentFixture<ModalWindowImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWindowImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWindowImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
