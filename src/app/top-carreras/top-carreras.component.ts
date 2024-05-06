import { Component } from '@angular/core';
import { CarreraService } from '../servicios/carrera.service';
import { Carrera } from '../modelo/carrera';
import { UniversidadServiceService } from '../servicios/universidad-service.service';
import { Universidad } from '../modelo/universidad';

@Component({
  selector: 'app-top-carreras',
  templateUrl: './top-carreras.component.html',
  styleUrls: ['./top-carreras.component.css']
})
export class TopCarrerasComponent {
  constructor(private carreraService: CarreraService, private universidadService: UniversidadServiceService) { }

  listaTopCarreras: Carrera[] = [];
  pagina: number = 0;
  registrosPorPagina = 5;
  universidad: Universidad = new Universidad();
  indice:number;
  numeroUltimaIteracion:number = 0;
  ngOnInit(): void {
    this.cargarCarreras();
  }

  cargarCarreras() {
    this.carreraService.obtenerTopCarreras(this.pagina, this.registrosPorPagina).subscribe((carreras: Carrera[]) => {
      this.listaTopCarreras = carreras;
    }, (error) => {
      console.error(error);
    })
  }

  cargarMasCarreras(cantidadCarreras:number) {
    this.pagina = this.pagina + 1;
    this.cargarCarreras();
    this.numeroUltimaIteracion = this.numeroUltimaIteracion + cantidadCarreras;
  }

  cargarMenosCarrereas(){
    this.pagina = this.pagina - 1;
    this.cargarCarreras();
    this.numeroUltimaIteracion = this.numeroUltimaIteracion - this.registrosPorPagina;
  }

  buscarUniversdiadPorIdCarrera(carrera:Carrera, index:number) {
    this.indice = index;
    this.universidadService.getuniversidadIdCarrera(carrera.id).subscribe((universdiad: Universidad) => {
      this.universidad = universdiad;
    }, (error) => {
      console.error(error);
    })
  }


}
