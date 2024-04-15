import { Injectable } from '@angular/core';
import { ServicioApiService } from './ServicioApi';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { emailContacto } from '../modelo/emailContacto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private HttpClient: HttpClient, private apiService: ServicioApiService) { }

  urlBase: string = this.apiService.baseUrl;

  public enviarComentario(email: emailContacto): Observable<any> {
    const url = this.urlBase + "/email/enviar"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.HttpClient.post(url, email, { headers: headers });

  }

  crearEmailContacto(nombre: string, apellido: string, emailEmisor: string, mensaje: string, asunto: string): emailContacto {
    let email: emailContacto = new emailContacto();
    email.asunto = asunto;
    email.apellido = apellido;
    email.nombre = nombre;
    email.emisor = emailEmisor;
    email.mensaje = mensaje;
    return email;
  }




}
