import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmailService } from '../servicios/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { AlertasService } from '../servicios/alertas.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private emailService: EmailService, private snackBar: MatSnackBar, private alertas: AlertasService) {

  }

  ngOnInit() {
    this.formContacto = this.formBuilder.group({
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'mensaje': ['', Validators.required],
      'asunto': ['', Validators.required],
      'correo': ['', [Validators.required, Validators.email]]
    });
  }

  formContacto: FormGroup;

  get nombre() {
    return this.formContacto.get('nombre') as FormControl;
  }

  get correo() {
    return this.formContacto.get('correo') as FormControl;
  }

  get apellido() {
    return this.formContacto.get('apellido') as FormControl;
  }

  get mensaje() {
    return this.formContacto.get('mensaje') as FormControl;
  }

  get asunto() {
    return this.formContacto.get('asunto') as FormControl;
  }

  vaciarCampos() {
    this.formContacto.get('asunto')?.setValue('');
    this.formContacto.get('apellido')?.setValue('');
    this.formContacto.get('correo')?.setValue('');
    this.formContacto.get('mensaje')?.setValue('');
    this.formContacto.get('nombre')?.setValue('');
  }

  enviar() {
    if (this.formContacto.valid) {
      const nombre = this.formContacto.get('nombre')?.value;
      const apellido = this.formContacto.get('apellido')?.value;
      const emailEmisor = this.formContacto.get('correo')?.value;
      const mensaje = this.formContacto.get('mensaje')?.value;
      const asunto = this.formContacto.get('asunto')?.value;

      this.vaciarCampos();

      const nuevoEmail = this.emailService.crearEmailContacto(nombre, apellido, emailEmisor, mensaje, asunto);
      this.alertas.alertaCuentaRegresiva("Enviando correo!", 4000);
      this.emailService.enviarComentario(nuevoEmail).subscribe((retorno: any) => {
        this.alertas.alertaExito("Correo enviado con exito!");
        this.formContacto.reset();
      }, (error) => {
        console.error(error);
        this.alertas.alertaError();
      })

    } else {
      console.log('El formulario no es válido');
    }
  }


}
