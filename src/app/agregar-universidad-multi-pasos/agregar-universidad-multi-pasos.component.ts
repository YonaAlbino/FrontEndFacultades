import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Calificacion } from '../modelo/calificacion';

@Component({
  selector: 'app-agregar-universidad-multi-pasos',
  templateUrl: './agregar-universidad-multi-pasos.component.html',
  styleUrls: ['./agregar-universidad-multi-pasos.component.css']
})
export class AgregarUniversidadMultiPasosComponent implements OnInit {
  constructor(private fb: FormBuilder) { }

  formularioAltaUniversidad!: FormGroup;

  indice: number = 1;

  ngOnInit(): void {
    this.formularioAltaUniversidad = this.iniciarFormAltaUniversidad();
  }


  iniciarFormAltaUniversidad(): FormGroup {
    return this.fb.group({
      nombre: ["", [Validators.required, Validators.minLength(4)]],
      direccionWeb: ["", [Validators.required, Validators.pattern("^(https?://)?(www\.)?[a-zA-Z0-9_-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?\/?$")]],
      direccionFisica: ["", [Validators.required, Validators.minLength(10)]],
      descripcion: ["", [Validators.required, Validators.minLength(30)]],
      nombreCarrera: ["", Validators.required],
      gradoCarrera: ["", Validators.required],
      duracionCarrera: ["", Validators.required]
    })
  }

  siguiente() {
    this.indice++;
  }

  anterior() {
    this.indice--;
  }

  handleCalificacionGuardada($event: Calificacion) {
    // this.listaCalificaciones = []; // Vacía la lista
    // this.listaCalificaciones.push(calificacion);
    // this.alertas.alertaMensajeExito("Calificada!");
  }

  enviarFormulario() {
    console.log(this.formularioAltaUniversidad);
  }

}
