import { TestBed } from '@angular/core/testing';

import { ReaccionServiceService } from './reaccion-service.service';

describe('ReaccionServiceService', () => {
  let service: ReaccionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReaccionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
