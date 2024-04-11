import { TestBed } from '@angular/core/testing';

import { UniversidadServiceService } from './universidad-service.service';

describe('UniversidadServiceService', () => {
  let service: UniversidadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversidadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
