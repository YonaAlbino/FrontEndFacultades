import { Universidad } from './../modelo/universidad';
import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../servicios/alertas.service';
import { UniversidadServiceService } from '../servicios/universidad-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {

  universidad!: Universidad;
  idUniversidad!: number;
  formularioEdicionUniversidad!: FormGroup;
  formularioCarrera!: FormGroup;

  constructor(
    private alertas: AlertasService,
    private uniService: UniversidadServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.idUniversidad = this.route.snapshot.params["id"];
    this.buscarUniversidad();
    this.formularioEdicionUniversidad = this.iniciarFormulario();
    this.formularioCarrera = this.iniciarFormularioCarrera();
  }

  //Metodo para iniciar el formulario para agregar carreras
  iniciarFormularioCarrera(): FormGroup {
    return this.fb.group({
      nombre: [""],
      grado: [""],
      duracion: [""]
    })
  }

  //Metodo para iniciar el formulario
  iniciarFormulario(): FormGroup {
    return this.fb.group({
      nombre: ["", [Validators.required, Validators.minLength(4)]],
      direccionWeb: ["", [Validators.required, Validators.pattern("^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[ 0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+ &%\$#_]*)?$")]],
      direccionFisica: ["", [Validators.required, Validators.minLength(10)]],
      descripcion: ["", [Validators.required, Validators.minLength(30)]],
      imagen: ["", [Validators.required]]
    })
  }

  //Metodo para buscar la universidad a editar
  buscarUniversidad() {
    this.uniService.buscarUniversdiad(this.idUniversidad).subscribe((universidad: Universidad) => {
      this.universidad = universidad;
      this.cargarDatosAeditar(universidad);
      console.log(this.universidad)
    }, (error) => {
      console.error(error);
    }
    )
  }

  //Metodo encargado de cargar los datos de la uni a editar 
  cargarDatosAeditar(universidad: Universidad) {
    this.formularioEdicionUniversidad.get('nombre')?.setValue(universidad.nombre);
    this.formularioEdicionUniversidad.get('direccionWeb')?.setValue(universidad.direccionWeb);
    this.formularioEdicionUniversidad.get('direccionFisica')?.setValue(universidad.direccion);
    this.formularioEdicionUniversidad.get('descripcion')?.setValue(universidad.descripcion);
    this.formularioEdicionUniversidad.get('imagen')?.setValue(universidad.imagen);
  }

  //Metodo para agregar una nueva carrera a la lista de carreras de la universidad
  agregarCarrera() {
    this.alertas.alertaExito("Carrera agregada con exito");
  }

  //Metodo para desactivar (logicamente) una carrera
  desactivarCarrera() {
    this.alertas.alertaExitoComun("Carrera desactivada con exito");
  }

  //Metodo para activar (logicamente) una carrera
  activarCarrera() {
    this.alertas.alertaExitoComun("Carrera activada con exito");
  }

  //Metodo para actualizar la universidad
  actualizarUniversidad() {
    this.capturarDatosFront();
    this.uniService.actualizarUniversidad(this.universidad).subscribe(() => {
      this.alertas.alertaExito("Universidad editada correctamente");
      this.router.navigate([""]);
    }, (error) => {
      console.error(error);
      this.alertas.alertaError();
    })
  }
  
  //Metodo que caputra los datos del front y los pasa a la universdiad
  capturarDatosFront() {
    this.universidad.nombre = this.formularioEdicionUniversidad.get('nombre')?.value;
    this.universidad.direccionWeb = this.formularioEdicionUniversidad.get('direccionWeb')?.value;
    this.universidad.direccion = this.formularioEdicionUniversidad.get('direccionFisica')?.value;
    this.universidad.descripcion = this.formularioEdicionUniversidad.get('descripcion')?.value;
    this.universidad.imagen = this.formularioEdicionUniversidad.get('imagen')?.value;
  }

}
