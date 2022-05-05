import { TestBed } from '@angular/core/testing';

import { ThreadSocketService } from './thread-socket.service';

describe('ThreadSocketService', () => {
  let service: ThreadSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreadSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
