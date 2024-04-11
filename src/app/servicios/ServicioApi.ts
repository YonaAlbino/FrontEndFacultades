import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioApiService {

  constructor() { }

  baseUrl:string = "http://localhost:8080";
}
