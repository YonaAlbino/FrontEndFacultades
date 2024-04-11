import { Component, Input, OnInit } from '@angular/core';
import { Calificacion } from '../modelo/calificacion';

@Component({
  selector: 'app-promedio-calificacion',
  templateUrl: './promedio-calificacion.component.html',
  styleUrls: ['./promedio-calificacion.component.css']
})
export class PromedioCalificacionComponent implements OnInit {

  //Obtengo la lista de calificaciones que se envio desde el elemento padre
  @Input() listaCalificacion: Calificacion[];



  promedio: number = 0;
  cantidadCalificaciones:number =  0;

  ngOnInit(): void {
    this.promedio = this.calcularPromedio();
    this.pintarEstrellas(this.promedio);
  }

  calcularPromedio(): number {
    let acumuladorNotas: number = 0;
    let cantidadNotas: number = this.listaCalificacion.length;
    this.cantidadCalificaciones = cantidadNotas;

    // Sumar todas las notas
    this.listaCalificacion.forEach(calificacion => {
      acumuladorNotas += calificacion.nota;
    });

    let promedio: number = acumuladorNotas / cantidadNotas;

  
    return Math.round(promedio);
  }


  pintarEstrellas(estrellasLlenas: number) {
    
    var numEstrellasLlenas = estrellasLlenas;
    var numEstrellasVacias = 5 - numEstrellasLlenas;

    var estrellasHtml = '★'.repeat(numEstrellasLlenas) + '☆'.repeat(numEstrellasVacias);

    //Obtengo la lista de nodos
    var elementos = document.querySelectorAll(".ratingStars");
    //Casteo la lista de nodos al ultimo objeto  html correspondiente de dicha lista
    var elementoNodo = elementos[elementos.length - 1];
    //Dibujo las estrellas en el objeto html
    elementoNodo.innerHTML = estrellasHtml;

  }



}
