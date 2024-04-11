import { TestBed } from '@angular/core/testing';

import { ServicioApiService } from './ServicioApi';

describe('ServicioApiService', () => {
  let service: ServicioApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
