
import { Universidad } from './../modelo/universidad';

import { Component, OnInit } from '@angular/core';
import { UniversidadServiceService } from '../servicios/universidad-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrera } from '../modelo/carrera';
import { Calificacion } from '../modelo/calificacion';
import { Comentario } from '../modelo/comentario';
import { ComentarioService } from '../servicios/comentario.service';
import { Observable } from 'rxjs';
import { Respuesta } from '../modelo/respuesta';
import { RespuestaService } from '../servicios/respuesta.service';
import { CarreraService } from '../servicios/carrera.service';
import { CarreraComponent } from '../carrera/carrera.component';
import { AlertasService } from '../servicios/alertas.service';



@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {


  mostrarCarreraComponent: boolean = false;
  nuevoComentario: string = "";
  respuesta: string = "";
  // comentario: Comentario = new Comentario();
  universidad: Universidad = new Universidad();
  listaDeRespuestas: Respuesta[];
  idUniversidad: number = 0;
  nombre: string = "";
  imagen: string = "";
  direccion: string = "";
  descripcion: string = "";
  direccionWeb: string = "";
  listaCarreras?: Carrera[] = [];
  carreraDeCarreraComponent: Carrera;
  listaCalificacion?: Calificacion[];
  listaComentarios?: Comentario[];
  isChecked: boolean = false;



  constructor(private uniService: UniversidadServiceService, private route: ActivatedRoute, private comentarioService: ComentarioService, private respuetaService: RespuestaService, private router: Router, private carreraService: CarreraService, private alertas:AlertasService) { }


  ngOnInit(): void {
    this.idUniversidad = this.route.snapshot.params["id"];
    this.cargarDatos(this.idUniversidad);
  }

  async cargarDatos(id: number) {
    try {
      await this.buscarUniversidad(this.idUniversidad);
      // this.nombre = this.universidad.nombre;
      // this.descripcion = this.universidad.descripcion;
      // this.direccion = this.universidad.direccion;
      // this.direccionWeb = this.universidad.direccionWeb;
      // this.imagen = this.universidad.imagen;
      // this.listaCalificacion = this.universidad.listaCalificacion;

      if (this.universidad.listaCarreras) {
        for (let carrera of this.universidad.listaCarreras) {
          if (carrera.activa) {
            this.listaCarreras?.push(carrera);
          }
        }
      }

      console.log(this.listaCarreras)

      //this.listaCarreras = this.universidad.listaCarreras;
      this.listaComentarios = this.universidad.listaComentarios;
    } catch (error) {
      console.log("Hubo un error al intentar mostrar los datos de la universidad");
    }
  }

  async buscarUniversidad(id: number) {
    try {
      const universidad = await this.uniService
        .buscarUniversdiad(id)
        .toPromise();
      this.universidad = universidad;
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    }
  }

  handleCalificacionGuardada(calificacion: Calificacion) {

    //let listaCalificacion = this.universidad.listaCalificacion;

    if (this.universidad.listaCalificacion) {
      this.universidad.listaCalificacion?.push(calificacion);
      this.uniService.actualizarUniversidad(this.universidad).subscribe((universidad: Universidad) => {
        console.log(universidad);
      }, (error) => {
        console.error(error);
      })
    }
  }


  crearNuevoComentario(mensaje:string): Observable<Comentario> {
    let nuevoComentario: Comentario = new Comentario();
    nuevoComentario.mensaje = mensaje;
    return this.comentarioService.guardarComentario(nuevoComentario);
  }


  eliminarUniversidad(idUniversidad: number) {
    this.alertas.alertaEliminacionUniversidad(idUniversidad);
  }

  mostrarDatosCarrera(event: any) {
    const id = event.target.value;
    if (id) {
      this.mostrarCarreraComponent = false;
      this.carreraService.buscarCarrera(id).subscribe((carrera: Carrera) => {
        this.carreraDeCarreraComponent = carrera;
        this.mostrarCarreraComponent = true;
      }),
        (error: any) => {
          console.error('Error al buscar la carrera:', error);
        }
    }
  }

  agregarNuevoComentario(mensaje:string) {
    this.crearNuevoComentario(mensaje).subscribe(
      (comentario: Comentario) => {
        comentario.listaRespuesta = [];
        this.universidad.listaComentarios?.push(comentario);
        this.uniService.actualizarUniversidad(this.universidad).subscribe((universidad: Universidad) => {
          this.universidad = universidad;
        });
        this.nuevoComentario = "";
      },
      (error) => {
        console.error('Error al guardar el comentario:', error);
      }
    );
  }

}
