import { TestBed } from '@angular/core/testing';

import { ServicioCalificacionesService } from './servicio-calificaciones.service';

describe('ServicioCalificacionesService', () => {
  let service: ServicioCalificacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioCalificacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
