import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Calificacion } from '../modelo/calificacion';
import { Router } from '@angular/router';
import { Universidad } from '../modelo/universidad';
import { Carrera } from '../modelo/carrera';
import { CarreraService } from '../servicios/carrera.service';
import { UniversidadServiceService } from '../servicios/universidad-service.service';
import { AlertasService } from '../servicios/alertas.service';

@Component({
  selector: 'app-agregar-universidad-multi-pasos',
  templateUrl: './agregar-universidad-multi-pasos.component.html',
  styleUrls: ['./agregar-universidad-multi-pasos.component.css']
})
export class AgregarUniversidadMultiPasosComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private carreraService:CarreraService,
     private universidadService:UniversidadServiceService, private alertas:AlertasService) { }

  ngOnInit(): void {
    this.formularioAltaUniversidad = this.iniciarFormAltaUniversidad();
  }


  formularioAltaUniversidad!: FormGroup;

  indice: number = 1;
  agregarCarrera: boolean = false;
  imagenCargada:boolean =false;
  listaCarrerasUniversidad:Carrera[] = [];
  listaCalificacionUniversidad:Calificacion[] = [];

  imagenPorDefecto: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnrtrI3kER6PYUADR5tjXQtwVvqj4kjiDZgRUf1SFWNQ&s";

  iniciarFormAltaUniversidad(): FormGroup {
    return this.fb.group({
      nombre: ["", [Validators.required, Validators.minLength(4)]],
      direccionWeb: ["", [Validators.required, Validators.pattern("^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[ 0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+ &%\$#_]*)?$")]],
      direccionFisica: ["", [Validators.required, Validators.minLength(10)]],
      descripcion: ["", [Validators.required, Validators.minLength(30)]],
      imagen: ["", [Validators.required]],
      nombreCarrera: [""],
      gradoCarrera: [""],
      duracionCarrera: [""]
    })
  }

  siguiente() {
    this.indice++;
  }

  anterior() {
    this.indice--;
  }

  guardarCalificacion(calificacion: Calificacion) {
    this.listaCalificacionUniversidad.push(calificacion);
    // this.alertas.alertaMensajeExito("Calificada!");
  }

  enviarFormulario() {
    let universidad: Universidad = new Universidad();
    universidad.setNombre(this.formularioAltaUniversidad.get('nombre')?.value);
    universidad.setDireccionWeb(this.formularioAltaUniversidad.get('direccionWeb')?.value);
    universidad.setDireccion(this.formularioAltaUniversidad.get('gradoCarrera')?.value);
    universidad.setDescripcion(this.formularioAltaUniversidad.get('descripcion')?.value);
    universidad.setImagen(this.imagenPorDefecto);
    universidad.setListaCarreras(this.listaCarrerasUniversidad);
    universidad.setListaCalificacion(this.listaCalificacionUniversidad);
    this.universidadService.guardadUniversidad(universidad).subscribe(() => {
      this.router.navigate([""]);
      this.alertas.alertaTrabajoRealizado();
    }, (error) => {
      this.alertas.alertaError();
      console.error(error);
    }) 
  }


  //Metodo para hacer visibles los campos para agrear una nueva carrera a la universidad
  mostrarCamposAgregarCarrera() {
    this.agregarCarrera = !this.agregarCarrera;
  }


  //Metodo para agregar una nueva carrera en la base de datos
  agregarCarreras() {
    let carrera:Carrera = new Carrera();
    carrera.setNombre(this.formularioAltaUniversidad.get('nombreCarrera')?.value);
    carrera.setGrado(this.formularioAltaUniversidad.get('gradoCarrera')?.value);
    carrera.setDuracion(this.formularioAltaUniversidad.get('duracionCarrera')?.value);
    this.carreraService.guardarCarrera(carrera).subscribe((carreraCreada) => {
      this.listaCarrerasUniversidad.push(carreraCreada);
    })
    
    this.formularioAltaUniversidad.patchValue({
      nombreCarrera: '',
      gradoCarrera: '',
      duracionCarrera: ''
    });

  }


  //Metodo que detecta cuando se escribe en el input de la imagen
  changeImagen(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.imagenPorDefecto = inputValue;
  }
  
  //Metodo que maneja el posible caso de que la imagen no cargue
  manejadorErrorImagenUniversdiad() {
    this.imagenCargada = true;
  }
  
  //Metodo para manejar la carga exitosa de la imagend de la universdiad
  manejadorExitoImagenUniversdiad() {
    this.imagenCargada =false;
  }}

