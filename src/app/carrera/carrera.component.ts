import { Comentario } from './../modelo/comentario';
import { Carrera } from './../modelo/carrera';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Universidad } from '../modelo/universidad';
import { Calificacion } from '../modelo/calificacion';
import { CarreraService } from '../servicios/carrera.service';
import { ComentarioService } from '../servicios/comentario.service';
import { Respuesta } from '../modelo/respuesta';
import { RespuestaService } from '../servicios/respuesta.service';
import { Observable } from 'rxjs';
import { AlertasService } from '../servicios/alertas.service';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit {

  constructor(private carreraService: CarreraService, private comentarioService: ComentarioService, private respuestaService: RespuestaService, private alertas:AlertasService) { }

  respuestaDeLaRespuestaDelComentario: string;
  comentario: string;
  respuestaDesdeElInput: string;
  listaComentarios: Comentario[];
  variableDeEjemplo:boolean = true;
  @Input() carrera: Carrera = new Carrera();

  ngOnInit(): void {
    if (this.carrera.listaComentarios)
      this.listaComentarios = this.carrera.listaComentarios;
  }

  handleCalificacionGuardada(calificacion: Calificacion) {
    this.carrera.listaCalificacion?.push(calificacion);
    this.carreraService.actualizarCarrera(this.carrera).subscribe((carrera: Carrera) => {
      console.log(carrera);
    }, (error) => {
      console.error(error);
    })
  }


  //Metodo para agregar un comentario a la carrera
  guardarComentario(mensaje: string) {
    this.variableDeEjemplo = false;
    this.comentarioService.guardarComentario(this.crearComentario(mensaje)).subscribe((comentario: Comentario) => {
      this.actualizarCarrera(comentario);
      
    }, (error) => {
      console.error(error);
    })
  }

  desplazarVista() {
    const comentariosContainer = document.getElementById(
      'comentariosContainer'
    );
    if (comentariosContainer) {
      comentariosContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }

  //Metodo para crear una nueva instancia de un Comentario
  crearComentario(mensaje: string): Comentario {
    let nuevoComentario = new Comentario();
    nuevoComentario.listaRespuesta = [];
    nuevoComentario.setMensaje(mensaje);
    return nuevoComentario;
  }

  //Metodo para crear una nueva instancia de una Respuesta
  crearRespuesta(mensaje: string): Observable<Respuesta> {
    let nuevaRespuesta = new Respuesta();
    nuevaRespuesta.mensaje = mensaje;
    return this.respuestaService.guardarRespuesta(nuevaRespuesta);
  }


  //Metodo para actualizar la lista de comentarios de la carrera actl
  actualizarCarrera(comentarioAguardar: Comentario) {
    this.carrera.listaComentarios?.push(comentarioAguardar);
    this.carreraService.actualizarCarrera(this.carrera).subscribe((carrera: Carrera) => {
      console.log(carrera);
      this.variableDeEjemplo = true;
      this.alertas.alertaExito("Comentario guardado");
    }, (error) => {
      console.error(error);
    });
  }

  //Metodo para actualizar la lista de respuestas del comentario
  actualizarComentario(comentarioAguardar: Comentario) {
    this.comentarioService.actualizarComentario(comentarioAguardar).subscribe((comentario: Comentario) => {
      console.log(comentario);
    },
      (error) => {
        console.error(error);
      }
    );
  }


    //Metodo para actualizar la lista de respuestas del la respuesta de un comentario
    actualizarRespuesta(respuestaAguardar: Respuesta) {
      this.respuestaService.actualizarRespuesta(respuestaAguardar).subscribe((respuesta: Respuesta) => {
        console.log(respuesta);
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
    respuesta.mostrarFormularioRespuesta = !respuesta.mostrarFormularioRespuesta;
  }


  //metodo para responder al comentario
  responderComentario(comentario: Comentario) {
    comentario.mostrarFormularioRespuesta = !comentario.mostrarFormularioRespuesta;
  }

  //Meotodo para guardar la respuesta de la respuesta del comentario
  guardarRespuestaDelComen(respuesta: Respuesta) {
    this.crearRespuesta(this.respuestaDeLaRespuestaDelComentario).subscribe((respuestaGuardada: Respuesta) => {
      respuesta.listaRespuesta?.push(respuestaGuardada);
      this.actualizarRespuesta(respuesta);
    },
      (error) => {
        console.error(error);
      })

    this.respuestaDeLaRespuestaDelComentario = "";
    respuesta.mostrarFormularioRespuesta = false;
  }

  //Metodo para guardar la respuesta del comentario
  guardarRespuesta(comentario: Comentario) {
    this.crearRespuesta(this.respuestaDesdeElInput).subscribe((respuesta: Respuesta) => {
      comentario.listaRespuesta?.push(respuesta);
      this.actualizarComentario(comentario);
    })

    this.respuestaDesdeElInput = "";
    comentario.mostrarFormularioRespuesta = false;
  }


}
