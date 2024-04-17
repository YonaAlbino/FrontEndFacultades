import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Universidad } from '../modelo/universidad';
import { ServicioApiService } from './ServicioApi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversidadServiceService {

  constructor(private HttpClient: HttpClient, private apiService: ServicioApiService) { }

  urlBase: string = this.apiService.baseUrl;

  public guardadUniversidad(data: Universidad): Observable<any> {
    const url = this.urlBase + "/universidad/crear"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.HttpClient.post(url, data, { headers: headers });
  }

  public actualizarUniversidad(universidad: Universidad):Observable<any> {
    const url = this.urlBase + "/universidad/editar"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.HttpClient.put(url, universidad, { headers: headers });
  }

  public obtenerUniversidades() {
    return this.HttpClient.get<Universidad[]>(this.urlBase + "/universidad/traer/todas");
  }

  public obtenerTopUniversidades(pagina:number, tamanio:number):Observable<Universidad[]>{
    return this.HttpClient.get<Universidad[]>(`${this.urlBase}/universidad/obtenerTopUniversidades?pagina=${pagina}&tamanio=${tamanio}`);
  }

  public buscarUniversdiad(id: number): Observable<any> {
    return this.HttpClient.get<any>(this.urlBase + "/universidad/buscar/" + id);
  }

  eliminarUniversidad(id: number): Observable<any> {
    const url = `${this.urlBase}/universidad/eliminar?id=${id}`;
    return this.HttpClient.delete(url, { responseType: 'text' });
  }


  obtenerUniversidadesPaginadas(pagina:number, tamanio:number):Observable<Universidad[]>{
    return this.HttpClient.get<Universidad[]>(`${this.urlBase}/universidad/paginadas?pagina=${pagina}&tamanio=${tamanio}`);
  }

}
