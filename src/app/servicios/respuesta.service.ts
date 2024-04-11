import { Injectable } from '@angular/core';
import { ServicioApiService } from './ServicioApi';
import { Respuesta } from '../modelo/respuesta'
import { HttpClient, HttpHeaders } from '@angular/common/http'; import { Observable, catchError, map } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class RespuestaService {


  constructor(private apiService: ServicioApiService, private HttpClient: HttpClient) { }

  urlBase = this.apiService.baseUrl;

  public guardarRespuesta(respuesta: Respuesta): Observable<Respuesta> {
    const url = this.urlBase + "/respuesta/crear";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.HttpClient.post<Respuesta>(url, respuesta, { headers: headers })
      .pipe(
        map((respuesta: Respuesta) => {
          const respuestaJSON = JSON.stringify(respuesta);
          const respuestaObjeto = JSON.parse(respuestaJSON);
          return respuestaObjeto;
        }),
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }


  crearRespuesta(mensaje: string): Observable<Respuesta> {
    let respuesta: Respuesta = new Respuesta();
    respuesta.mensaje = mensaje;
    return this.guardarRespuesta(respuesta);
  }


  actualizarRespuesta(respuestaOriginal: Respuesta):Observable<any> {

    console.log(respuestaOriginal.listaRespuesta + " lista de respuestas en el servicio")

    const url = this.urlBase + "/respuesta/editar";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.HttpClient.put(url, respuestaOriginal, { headers: headers });
  }

}
