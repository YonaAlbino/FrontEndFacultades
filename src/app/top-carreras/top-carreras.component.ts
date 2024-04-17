import { Component } from '@angular/core';
import { CarreraService } from '../servicios/carrera.service';
import { Carrera } from '../modelo/carrera';

@Component({
  selector: 'app-top-carreras',
  templateUrl: './top-carreras.component.html',
  styleUrls: ['./top-carreras.component.css']
})
export class TopCarrerasComponent {


  constructor(private carreraService: CarreraService) { }

  listaTopCarreras: Carrera[] = [];
  pagina: number = 0;
  registrosPorPagina = 4;


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

  cargarMasCarreras() {
    this.pagina = this.pagina +1;
    this.cargarCarreras();
  }


}
