import { Injectable } from '@angular/core';
import { ServicioApiService } from '../ServicioApi';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Calificacion } from 'src/app/modelo/calificacion';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioCalificacionesService {

  constructor(private servicioApi:ServicioApiService, private HttpClient:HttpClient) { }

  urlBase = this.servicioApi.baseUrl;

    public guardarCalificacion(data: Calificacion): Observable<Calificacion> {
      const url = this.urlBase + "/calificacion/crear";
    
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    
      return this.HttpClient.post<Calificacion>(url, data, { headers: headers })
        .pipe(
          map((respuesta: Calificacion) => {
            const respuestaJSON = JSON.stringify(respuesta);
            const respuestaObjeto = JSON.parse(respuestaJSON);
            return respuestaObjeto;
          }),
          catchError((error) => {
            console.log(error);
            // Si hay un error, puedes retornar un valor predeterminado o lanzar una excepción.
           throw error;
          })
        );
    }


}
