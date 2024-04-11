import { Universidad } from './../modelo/universidad';
import { Component, OnInit } from '@angular/core';
import { UniversidadServiceService } from '../servicios/universidad-service.service';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent implements OnInit {

  universidades: Universidad[] = [];


  constructor(private universidadService: UniversidadServiceService) { }


  ngOnInit() {
    this.cargarUniversidades();
  }

  cargarUniversidades() {
    this.universidadService.obtenerUniversidades().subscribe(data => {
      this.universidades = data;
    },
      error => {
        console.log(error);
      });
  }
}

