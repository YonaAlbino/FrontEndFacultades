import { Component, Input } from '@angular/core';
import { Comentario } from '../modelo/comentario';
import { Respuesta } from '../modelo/respuesta';
import { CarreraService } from '../servicios/carrera.service';
import { ComentarioService } from '../servicios/comentario.service';
import { RespuestaService } from '../servicios/respuesta.service';
import { Carrera } from '../modelo/carrera';
import { Calificacion } from '../modelo/calificacion';
import { Observable } from 'rxjs';
import { Universidad } from '../modelo/universidad';
import { ReaccionServiceService } from '../servicios/reaccion-service.service';
import { Reaccion } from '../modelo/reaccion';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css'],
})
export class ComentarioComponent {
  //Metodo para cargar comentarios tanto de universidad o carrera
  eliminarComentario() {
    throw new Error('Method not implemented.');
  }

  constructor(
    private carreraService: CarreraService,
    private comentarioService: ComentarioService,
    private respuestaService: RespuestaService,
    private reaccionService: ReaccionServiceService
  ) { }

  respuestaDeLaRespuestaDelComentario: string;
  comentario: string;
  respuestaDesdeElInput: string;
  listaComentarios: Comentario[] = [];
  verComentarios: boolean = true;
  paginaActual: number = 0;
  cantidadRegistros: number = 10;

  @Input() Universidad: Universidad;
  @Input() carrera: Carrera;


  // @Input() comentariosLista: Comentario[];

  ngOnInit(): void {
    // if (this.comentariosLista)
    //   this.listaComentarios = this.comentariosLista;

    if (this.carrera) {
      this.CargarComentariosPaginadosCarrera();
    }

    if (this.Universidad) {
      this.CargarComentariosPaginadosUniversidad();
    }
  }

  //Metodo para crear una nueva instancia de un Comentario
  crearComentario(mensaje: string): Comentario {
    let nuevoComentario = new Comentario();
    nuevoComentario.setMensaje(mensaje);
    return nuevoComentario;
  }

  //Metodo para crear una nueva instancia de una Respuesta
  crearRespuesta(mensaje: string): Observable<Respuesta> {
    let nuevaRespuesta = new Respuesta();
    nuevaRespuesta.mensaje = mensaje;
    return this.respuestaService.guardarRespuesta(nuevaRespuesta);
  }

  //Metodo para actualizar la lista de respuestas del comentario
  actualizarComentario(comentarioAguardar: Comentario) {
    this.comentarioService.actualizarComentario(comentarioAguardar).subscribe(
      (comentario: Comentario) => {
        console.log("comentario guardado " + comentario);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //Metodo para actualizar la lista de respuestas del la respuesta de un comentario
  actualizarRespuesta(respuestaAguardar: Respuesta) {
    this.respuestaService.actualizarRespuesta(respuestaAguardar).subscribe(
      (respuesta: Respuesta) => {
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //Metodo para mostrar o no las respuestas de cada comentario
  toggleRespuestas(comentario: Comentario) {
    comentario.mostrarRespuestas = !comentario.mostrarRespuestas;
  }

  //Metodo para mostrar o no las respuestas de cada respuesta
  toggleRespuestasDelComentario(respuesta: Respuesta) {
    respuesta.mostrarRespuestas = !respuesta.mostrarRespuestas;
  }

  //metodo para responder a la respuesta del comentario
  responderRespuestas(respuesta: Respuesta) {
    respuesta.mostrarFormularioRespuesta =
      !respuesta.mostrarFormularioRespuesta;
  }

  //metodo para responder al comentario
  responderComentario(comentario: Comentario) {
    comentario.mostrarFormularioRespuesta =
      !comentario.mostrarFormularioRespuesta;
  }

  //Meotodo para guardar la respuesta de la respuesta del comentario
  guardarRespuestaDelComen(respuesta: Respuesta) {
    this.crearRespuesta(this.respuestaDeLaRespuestaDelComentario).subscribe(
      (respuestaGuardada: Respuesta) => {
        respuesta.listaRespuesta?.push(respuestaGuardada);
        this.actualizarRespuesta(respuesta);
      },
      (error) => {
        console.error(error);
      }
    );

    this.respuestaDeLaRespuestaDelComentario = '';
    respuesta.mostrarFormularioRespuesta = false;
  }

  //Metodo para guardar la respuesta del comentario
  guardarRespuesta(comentario: Comentario) {
    this.crearRespuesta(this.respuestaDesdeElInput).subscribe(
      (respuesta: Respuesta) => {
        // respuesta.listaRespuesta = [];
        comentario.listaRespuesta?.push(respuesta);
        this.actualizarComentario(comentario);
      }
    );

    this.respuestaDesdeElInput = '';
    comentario.mostrarFormularioRespuesta = false;
  }

  //Metodo para ordenar la lista de comentarios de mas recientes a menos recientes
  traerComentariosMasRecientes() {
    // Ordenar la lista de comentarios por fecha de manera descendente
    this.listaComentarios.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      return fechaB.getTime() - fechaA.getTime();
    });
  }

  //Metodo para ordenar la lista de comentarios de mas recientes a menos recientes
  traerComentariosMasAntiguos() {
    // Ordenar la lista de comentarios por fecha de manera descendente
    this.listaComentarios.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      return fechaA.getTime() - fechaB.getTime();
    });
  }

  //Metodo para ocultar los comentarios
  ocultarComentarios() {
    this.verComentarios = !this.verComentarios;
  }

  //Metodo para cargar comentarios paginados
  CargarComentariosPaginadosUniversidad() {
    this.comentarioService
      .CargarComentariosPaginadosUniversidad(
        this.paginaActual,
        this.cantidadRegistros,
        this.Universidad.id
      )
      .subscribe(
        (listaComentarios: Comentario[]) => {
          this.listaComentarios = listaComentarios;
          this.paginaActual++;
        },
        (error) => console.error(error)
      );

    this.desplazarVista();
  }

  //Metodo para cargar comentarios paginados
  CargarComentariosPaginadosCarrera() {
    console.log(this.carrera.id);
    this.comentarioService
      .CargarComentariosPaginadosCarrera(
        this.paginaActual,
        this.cantidadRegistros,
        this.carrera.id
      )
      .subscribe(
        (listaComentarios: Comentario[]) => {
          this.listaComentarios = listaComentarios;
          this.paginaActual++;
        },
        (error) => console.error(error)
      );

    this.desplazarVista();
  }

  // Desplazar la vista del usuario al contenedor de comentarios
  desplazarVista() {
    const comentariosContainer = document.getElementById(
      'comentariosContainer'
    );
    if (comentariosContainer) {
      comentariosContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }

  //Metodo para recargar los comentarios
  recargarComentarios() {
    this.paginaActual = 0;
    if (this.carrera) {
      this.CargarComentariosPaginadosCarrera();
    }

    if (this.Universidad) {
      this.CargarComentariosPaginadosUniversidad();
    }
  }

  //Metodo para cargar comentarios tanto de universidad o carrera
  cargarComentarios() {
    if (this.carrera) {
      this.CargarComentariosPaginadosCarrera();
    }

    if (this.Universidad) {
      this.CargarComentariosPaginadosUniversidad();
    }

  }

  //Metodo para añadir reacion de megusta
  megusta(comentario: Comentario) {
    console.log(comentario)
    this.reaccionService.guardarReaccion(this.crearReaccion(1)).subscribe((reaccion: Reaccion) => {
      comentario.listaReaccion?.push(reaccion);
      this.actualizarComentario(comentario);
    })
  }

  //Metodo para crear una  instancia de una reaccion
  crearReaccion(megustaNoMeGusta: number): Reaccion {
    let reaccion: Reaccion = new Reaccion();
    if (megustaNoMeGusta === 1)
      reaccion.meGusta = 1;
    if (megustaNoMeGusta === 0)
      reaccion.noMegusta = 1;
    return reaccion;
  }

  //Metodo para añadir reaccion de no me gusta
  noMeGusta(comentario: Comentario) {
    this.reaccionService.guardarReaccion(this.crearReaccion(0)).subscribe((reaccion: Reaccion) => {
      comentario.listaReaccion?.push(reaccion);
      this.actualizarComentario(comentario);
    })
  }

  calcularSumaMeGusta(comentarios: any[]): number {
    let suma = 0;
    comentarios.forEach(comentario => {
      suma += comentario.meGusta;
    });
    return suma;
  }

  calcularSumaNoMeGusta(comentarios: any[]): number {
    let suma = 0;
    comentarios.forEach(comentario => {
      suma += comentario.noMegusta;
    });
    return suma;
  }

  megustaRespuesta(respuesta: Respuesta) {
    console.log("oeoe")
    this.reaccionService.guardarReaccion(this.crearReaccion(1)).subscribe((reaccion: Reaccion) => {
      respuesta.listaReaccion?.push(reaccion);
      this.actualizarRespuesta(respuesta);
    })
  }

  noMeGustaRespuesta(respuesta: Respuesta) {
    this.reaccionService.guardarReaccion(this.crearReaccion(0)).subscribe((reaccion: Reaccion) => {
      respuesta.listaReaccion?.push(reaccion);
      this.actualizarRespuesta(respuesta);
    })
  }


}


