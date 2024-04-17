import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUniversidadesComponent } from './top-universidades.component';

describe('TopUniversidadesComponent', () => {
  let component: TopUniversidadesComponent;
  let fixture: ComponentFixture<TopUniversidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopUniversidadesComponent]
    });
    fixture = TestBed.createComponent(TopUniversidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
