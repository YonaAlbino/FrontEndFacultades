import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarUniversidadMultiPasosComponent } from './agregar-universidad-multi-pasos.component';

describe('AgregarUniversidadMultiPasosComponent', () => {
  let component: AgregarUniversidadMultiPasosComponent;
  let fixture: ComponentFixture<AgregarUniversidadMultiPasosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarUniversidadMultiPasosComponent]
    });
    fixture = TestBed.createComponent(AgregarUniversidadMultiPasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
