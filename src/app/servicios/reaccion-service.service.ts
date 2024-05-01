import { Injectable } from '@angular/core';
import { ServicioApiService } from './ServicioApi';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reaccion } from '../modelo/reaccion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReaccionServiceService {

  constructor(private apiService: ServicioApiService, private httpClient: HttpClient) { }
  
  urlBase:string = this.apiService.baseUrl;

  public guardarReaccion(reaccion: Reaccion): Observable<any> {
    const url = this.urlBase + "/reaccion/crear"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(url, reaccion, { headers: headers });
  }
}
