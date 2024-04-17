import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCarrerasComponent } from './top-carreras.component';

describe('TopCarrerasComponent', () => {
  let component: TopCarrerasComponent;
  let fixture: ComponentFixture<TopCarrerasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopCarrerasComponent]
    });
    fixture = TestBed.createComponent(TopCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
