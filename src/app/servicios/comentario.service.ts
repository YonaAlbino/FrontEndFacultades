import { Injectable } from '@angular/core';
import { ServicioApiService } from './ServicioApi';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comentario } from '../modelo/comentario';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private HttpClient: HttpClient, private apiService: ServicioApiService) { }


  urlBase = this.apiService.baseUrl;

  public guardarComentario(data: Comentario): Observable<any> {
    const url = this.urlBase + "/comentario/crear";

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.HttpClient.post(url, data, { headers: headers });
  }

  public actualizarComentario(comentario: Comentario): Observable<any> {
    const url = this.urlBase + "/comentario/editar"
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.HttpClient.put(url, comentario, { headers: headers });
  }

  CargarComentariosPaginadosUniversidad(pagina:number, tamanio:number, idUniversidad:number):Observable<Comentario[]>{
    return this.HttpClient.get<Comentario[]>(this.urlBase+"/comentario/encontrarComentariosPorIdUniversidad/"+idUniversidad+"?pagina="+pagina+"&tamanio="+tamanio);
  }

  CargarComentariosPaginadosCarrera(pagina:number, tamanio:number, idCarrera:string):Observable<Comentario[]>{
    return this.HttpClient.get<Comentario[]>(this.urlBase+"/comentario/encontrarComentariosPorIdCarrera/"+idCarrera+"?pagina="+pagina+"&tamanio="+tamanio);
  }
}
