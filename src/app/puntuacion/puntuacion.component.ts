import { Component, EventEmitter, Output } from '@angular/core';
import { ServicioCalificacionesService } from '../servicios/calificacion/servicio-calificaciones.service';
import { Calificacion } from '../modelo/calificacion';
import { Observable, catchError } from 'rxjs';

@Component({
  selector: 'app-puntuacion',
  templateUrl: './puntuacion.component.html',
  styleUrls: ['./puntuacion.component.css']
})
export class PuntuacionComponent {

  puntuacion: number = 0.0;


  constructor(private servicioCalificaciones: ServicioCalificacionesService) { }

  @Output() calificacionGuardada: EventEmitter<Calificacion> = new EventEmitter<Calificacion>();


  capturarPuntacion(event: Event) {
      let puntos: string = (<HTMLInputElement>event.target).value;
      this.puntuacion = parseFloat(puntos);
  
      this.guardarCalificacion().subscribe((calificacion: Calificacion) => {
        this.calificacionGuardada.emit(calificacion);
     
      });

    
  }

  guardarCalificacion(): Observable<Calificacion> {
    let calificacion: Calificacion = new Calificacion();
    calificacion.setNota(this.puntuacion);

    return this.servicioCalificaciones.guardarCalificacion(calificacion).pipe(
      catchError((error) => {
        console.log(error);
        throw error;
      })
    );
  }


}
