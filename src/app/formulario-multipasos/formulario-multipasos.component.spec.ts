import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioMultipasosComponent } from './formulario-multipasos.component';

describe('FormularioMultipasosComponent', () => {
  let component: FormularioMultipasosComponent;
  let fixture: ComponentFixture<FormularioMultipasosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioMultipasosComponent]
    });
    fixture = TestBed.createComponent(FormularioMultipasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
