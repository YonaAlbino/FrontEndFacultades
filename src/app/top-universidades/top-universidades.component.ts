import { Component, OnInit } from '@angular/core';
import { UniversidadServiceService } from '../servicios/universidad-service.service';
import { Universidad } from '../modelo/universidad';

@Component({
  selector: 'app-top-universidades',
  templateUrl: './top-universidades.component.html',
  styleUrls: ['./top-universidades.component.css']
})
export class TopUniversidadesComponent implements OnInit {
  constructor(private universidadService: UniversidadServiceService) { }

  listaTopUniversidades: Universidad[] = [];
  pagina: number = 0;
  registrosPorPagina = 4;


  ngOnInit(): void {
    this.cargarUniversidades();
  }

  cargarUniversidades() {
    this.universidadService.obtenerTopUniversidades(this.pagina, this.registrosPorPagina).subscribe((universidades: Universidad[]) => {
      this.listaTopUniversidades = universidades;
    }, (error) => {
      console.error(error);
    })
  }

  cargarMasUniversidades() {
    this.pagina = this.pagina +1;
    this.cargarUniversidades();
  }

}
