
import { CarreraService } from './../servicios/carrera.service';
import { Carrera } from './../modelo/carrera';
import { Universidad } from '../modelo/universidad';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { Calificacion } from './../modelo/calificacion';
import { ServicioCalificacionesService } from './../servicios/calificacion/servicio-calificaciones.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UniversidadServiceService } from '../servicios/universidad-service.service';
import { Comentario } from '../modelo/comentario';
import { ActivatedRoute, Router } from '@angular/router';
import { ComentarioService } from '../servicios/comentario.service';



@Component({
  selector: 'app-agregar-institucion',
  templateUrl: './agregar-institucion.component.html',
  styleUrls: ['./agregar-institucion.component.css']
})
export class AgregarInstitucionComponent implements OnInit {

  constructor(private servicioCalificaciones: ServicioCalificacionesService, private universidadService: UniversidadServiceService, private router: Router, private servicioComentario: ComentarioService, private carreraService: CarreraService, private route: ActivatedRoute) { }


  imagenUrl: String = "";
  private calificacionUniversidad: number = 0.0;
  comentario: string = "";
  nombre: string = "";
  imagen: string = "";
  direccion: string = "";
  descripcion: string = "";
  direccionWeb: string = "";
  listaCarreras: Carrera[] = [];
  listaComentarios: Comentario[] = [];
  listaCalificaciones: Calificacion[] = [];
  nombreCarrera: string = '';
  gradoCarrera: string = '';
  duracionCarrera: string = '';
  idUniversidad: number = 0;
  idDeUniversidadEditada: number = 0;
  carreraSeleccionada: Carrera;
  propiedadActivaCarrera: boolean;


  cargarImagenAlTeclear(event: Event) {
    this.imagenUrl = (<HTMLInputElement>event.target).value;
  }

  public cargarImagenPorDefecto() {
    this.imagenUrl = "https://editorial.unc.edu.ar/wp-content/uploads/sites/33/2022/09/placeholder.png";
  }

  ngOnInit(): void {
    this.idUniversidad = this.route.snapshot.params["id"];
    this.cargarImagenPorDefecto();
    if (this.idUniversidad) {
      this.buscarUniversidadPorId(this.idUniversidad);
    }
  }

  preCargasDatosUniAeditar(universidad: Universidad) {
    this.idDeUniversidadEditada = universidad.id;
    this.nombre = universidad.nombre;
    this.imagen = universidad.imagen;
    this.descripcion = universidad.descripcion;
    this.direccion = universidad.direccion;
    this.imagenUrl = universidad.imagen;
    this.direccionWeb = universidad.direccionWeb;
    if (universidad.listaCalificacion)
      this.listaCalificaciones = universidad.listaCalificacion;
    if (universidad.listaCarreras)
      this.listaCarreras = universidad.listaCarreras;
    if (universidad.listaComentarios)
      this.listaComentarios = universidad.listaComentarios;
  }

  buscarUniversidadPorId(id: number) {
    this.universidadService.buscarUniversdiad(id).subscribe((universidad: Universidad) => {
      this.preCargasDatosUniAeditar(universidad);
      console.log(universidad);
    }, (error) => {
      console.error(error);
    })
  }

  caputrarCalificacion(event: Event) {
    let nota: string = (<HTMLInputElement>event.target).value;
    this.calificacionUniversidad = parseFloat(nota);
  }


  agregar() {
    let universidad: Universidad = new Universidad();
    universidad.setNombre(this.nombre);
    universidad.setDireccion(this.direccion);
    universidad.setDescripcion(this.descripcion);
    universidad.setDireccionWeb(this.direccionWeb);
    universidad.setImagen(this.imagen);
    universidad.setListaCarreras(this.listaCarreras);
    universidad.setListaComentarios(this.listaComentarios);
    universidad.setListaCalificacion(this.listaCalificaciones);

    if (this.idUniversidad) {
      //console.log(universidad);
      universidad.id = this.idDeUniversidadEditada;
      this.universidadService.actualizarUniversidad(universidad).subscribe((universidad: Universidad) => {
        this.router.navigate([""]);
      },
        (error) => {
          console.error(error);
        })
    } else {
      this.guardarUniversidad(universidad).subscribe(() => {
        this.router.navigate([""]);
      });
    }

  }

  guardarUniversidad(Universidad: Universidad): Observable<any> {
    return this.universidadService.guardadUniversidad(Universidad);
  }

  crearCarrera() {
    let carrera: Carrera = new Carrera();
    carrera.nombre = this.nombreCarrera;
    carrera.grado = this.gradoCarrera;
    carrera.duracion = this.duracionCarrera;
    this.carreraService.saveCarrera(carrera).subscribe((carreraGuardada: Carrera) => {
      this.listaCarreras?.push(carreraGuardada);
    },
      (error) => {
        console.error('Error al guardar la carrera:', error);
      }
    );
  }

  handleCalificacionGuardada(calificacion: Calificacion) {
    this.listaCalificaciones = []; // Vacía la lista
    this.listaCalificaciones.push(calificacion);
  }

  errorCargaImagen(event: any) {
    event.preventDefault();
    this.cargarImagenPorDefecto();
  }

  eliminarCarreraSeleccionada() {
    if (this.carreraSeleccionada) {
      this.carreraSeleccionada.activa = false;
      this.carreraService.actualizarCarrera(this.carreraSeleccionada).subscribe((carrera: Carrera) => {
        console.log(carrera);
      }, (error) => {
        console.error(error);
      })
    }
  }

  retornarPropiedadActiva() {
    this.propiedadActivaCarrera = this.carreraSeleccionada.activa;
  }

  reactivarCarreraSeleccionada() {
    if (this.carreraSeleccionada) {
      this.carreraSeleccionada.activa = true;
      this.carreraService.actualizarCarrera(this.carreraSeleccionada).subscribe((carrera: Carrera) => {
        console.log(carrera);
      }, (error) => {
        console.error(error);
      })
    }
  }

}
