import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicioApiService } from './ServicioApi';
import { Carrera } from '../modelo/carrera';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {


  constructor(private HttpClient: HttpClient, private apiService: ServicioApiService) { }


  urlBase = this.apiService.baseUrl;

  public guardarCarrera(carrera: Carrera): Observable<any> {
    const url = this.urlBase + "/carrera/crear"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.HttpClient.post(url, carrera, { headers: headers });
  }

  saveCarrera(carrera: Carrera): Observable<any> {
    return this.guardarCarrera(carrera);
  }

  public buscarCarrera(id: number): Observable<any> {
    return this.HttpClient.get<any>(this.urlBase + "/carrera/buscar/" + id);
  }

  public actualizarCarrera(carrera: Carrera): Observable<any> {
    const url = this.urlBase + "/carrera/editar"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.HttpClient.put(url, carrera, { headers: headers });
  }

  eliminarCarrera(id: number): Observable<any> {
    console.log(id);
    const url = `${this.urlBase}/carrera/eliminar?id=${id}`;
    return this.HttpClient.delete(url, { responseType: 'text' });
  }

  eliminarUniversidad(id: number): Observable<any> {
    const url = `${this.urlBase}/universidad/eliminar?id=${id}`;
    return this.HttpClient.delete(url, { responseType: 'text' });
  }
  

}
