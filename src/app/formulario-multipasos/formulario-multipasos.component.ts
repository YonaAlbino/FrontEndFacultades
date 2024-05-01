import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-multipasos',
  templateUrl: './formulario-multipasos.component.html',
  styleUrls: ['./formulario-multipasos.component.css']
})
export class FormularioMultipasosComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ejemploForm!: FormGroup;

  ngOnInit(): void {
    this.ejemploForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: ["", [Validators.required, Validators.minLength(4)]],
      segundoNombre: ["", Validators.required],
      apellido: ["", Validators.required],
      edad: ["", Validators.required]
    })
  }

  // onSubmit(): void {
  //   console.log();
  // }

  pasoActual = 1;

  siguientePaso() {
    this.pasoActual++;
  }

  pasoAnterior() {
    this.pasoActual--;
  }

  enviarFormulario() {
    console.log(this.ejemploForm.value)
  }
}
