import { Universidad } from './../modelo/universidad';
import { Component, OnInit } from '@angular/core';
import { UniversidadServiceService } from '../servicios/universidad-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent implements OnInit {

  universidades: Universidad[] = [];
  registrosPorPagina = 8;
  paginaActual = 0;
  cantidadPaginas: number = 0;


  constructor(private universidadService: UniversidadServiceService) { }

  ngOnInit() {
    this.cargarUniversidades();
    this.obtenerUniversidadesPaginadas()
  }


  cargarUniversidades() {
    this.universidadService.obtenerUniversidades().subscribe(data => {
      this.cantidadPaginas =  Math.ceil(data.length / this.registrosPorPagina);
    },
      error => {
        console.log(error);
      });
  }


  obtenerUniversidadesPaginadas() {
    this.universidadService.obtenerUniversidadesPaginadas(this.paginaActual , this.registrosPorPagina).subscribe((universidades: Universidad[]) => {
      this.universidades = universidades;
    }, (error) => {
      console.error(error);
    })
  }


  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    this.obtenerUniversidadesPaginadas();
  }



}




