import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraDeBusquedaComponent } from './barra-de-busqueda.component';

describe('BarraDeBusquedaComponent', () => {
  let component: BarraDeBusquedaComponent;
  let fixture: ComponentFixture<BarraDeBusquedaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraDeBusquedaComponent]
    });
    fixture = TestBed.createComponent(BarraDeBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
