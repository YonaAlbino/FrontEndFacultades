import { Component, OnInit } from '@angular/core';
import { UniversidadServiceService } from '../servicios/universidad-service.service';
import { Universidad } from '../modelo/universidad';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-universidades',
  templateUrl: './top-universidades.component.html',
  styleUrls: ['./top-universidades.component.css']
})
export class TopUniversidadesComponent implements OnInit {
  numeroUltimaIteracion: number = 0;
  constructor(private universidadService: UniversidadServiceService) { }

  listaTopUniversidades: Universidad[] = [];
  pagina: number = 0;
  registrosPorPagina = 5;


  ngOnInit(): void {
    this.cargarUniversidades();
  }

  cargarUniversidades() {
    return new Promise<void>((resolve, reject) => {
      this.universidadService.obtenerTopUniversidades(this.pagina, this.registrosPorPagina).subscribe((universidades: Universidad[]) => {
        this.listaTopUniversidades = universidades;
        resolve(); // Resuelve la promesa cuando la operación está completa
      },
        (error) => {
          console.error(error);
          reject(error); // Rechaza la promesa en caso de error
        }
      );
    })
  }

  async cargarMasUniversidades(totalUniversidades: number) {
    this.pagina = this.pagina + 1;
    await this.cargarUniversidades();
    if (this.listaTopUniversidades.length > 0) {
      this.numeroUltimaIteracion = this.numeroUltimaIteracion + totalUniversidades;
    }
  }

  cargarMenosUniversidades() {
    this.pagina = this.pagina - 1;
    this.cargarUniversidades();
    this.listaTopUniversidades.length
    this.numeroUltimaIteracion = this.numeroUltimaIteracion - this.registrosPorPagina;
  }

}
