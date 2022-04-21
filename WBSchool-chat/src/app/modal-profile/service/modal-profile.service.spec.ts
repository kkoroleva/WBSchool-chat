import { TestBed } from '@angular/core/testing';

import { ModalProfileService } from './modal-profile.service';

describe('ModalProfileService', () => {
  let service: ModalProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
