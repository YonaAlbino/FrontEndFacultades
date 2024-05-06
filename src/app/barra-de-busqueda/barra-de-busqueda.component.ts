import { Universidad } from '../modelo/universidad';
import { UniversidadServiceService } from './../servicios/universidad-service.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-barra-de-busqueda',
  templateUrl: './barra-de-busqueda.component.html',
  styleUrls: ['./barra-de-busqueda.component.css']
})
export class BarraDeBusquedaComponent {

  nombreUniversidad: string;

  constructor(private UniversidadServiceService: UniversidadServiceService) {
    this.nombreUniversidad = '';
  }

  @Output() universdiadEncontrada: EventEmitter<Universidad[]> = new EventEmitter<Universidad[]>();

  buscarUniversidadPorNombre(nombreUniversdiad: string) {
    this.UniversidadServiceService.findUniversidadByName(nombreUniversdiad).subscribe((universidades) => {
      this.universdiadEncontrada.emit(universidades);
    }, (error) => {
      console.error(error);
    })
  }



}
