import { Component, OnInit } from '@angular/core';
import { UniversidadServiceService } from '../servicios/universidad-service.service';
import { Universidad } from '../modelo/universidad';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  constructor(private universidadService: UniversidadServiceService) { }

  universidades: Universidad[] = new Array(3);


  ngOnInit(): void {
    this.cargarTresPrimerasImagenes();
  }

  cargarTresPrimerasImagenes() {
    this.universidadService.obtenerPrimerasTresImagenes().subscribe((universidades: Universidad[]) => {
      this.universidades = universidades;
      if (this.universidades.length < 3) {
        this.completarCampos(this.universidades);
      }
    },
      (error) => {
        console.error(error);
      })
  }

  completarCampos(listaUniversdiades: Universidad[]) {
    for (let i = listaUniversdiades.length; i < 3; i++) {
      listaUniversdiades[i] = new Universidad();
      listaUniversdiades[i].imagen = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
    }
  }
}