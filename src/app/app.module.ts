
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import { BarraDeBusquedaComponent } from './barra-de-busqueda/barra-de-busqueda.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { FooterComponent } from './footer/footer.component';
import { PrincipalComponent } from './principal/principal.component';
import { RouterModule, Routes } from '@angular/router';
import { AgregarInstitucionComponent } from './agregar-institucion/agregar-institucion.component';
import { ContactoComponent } from './contacto/contacto.component';
import { RegistroComponent } from './registro/registro.component';
import { LoguinComponent } from './loguin/loguin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PuntuacionComponent } from './puntuacion/puntuacion.component';
import { DetalleComponent } from './detalle/detalle.component';
import { PromedioCalificacionComponent } from './promedio-calificacion/promedio-calificacion.component';
import { CarreraComponent } from './carrera/carrera.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TopUniversidadesComponent } from './top-universidades/top-universidades.component';
import { TopCarrerasComponent } from './top-carreras/top-carreras.component';
import { RecargaDirective } from './directivas/recarga.directive';
import { ReaccionComponent } from './modelo/reaccion/reaccion.component';
import { FormularioMultipasosComponent } from './formulario-multipasos/formulario-multipasos.component';
import { AgregarUniversidadMultiPasosComponent } from './agregar-universidad-multi-pasos/agregar-universidad-multi-pasos.component';
import { EdicionComponent } from './edicion/edicion.component';



const appRoutes:Routes=[
  {path:'', component:PrincipalComponent},
  {path:'registro', component:RegistroComponent},
  {path:'contacto', component:ContactoComponent},
  {path:'loguin', component:LoguinComponent},
  {path:'agregarInstitucion', component:AgregarInstitucionComponent},
  {path:'agregarInstitucion/:id', component:AgregarInstitucionComponent},
  {path:'puntuacion', component:PuntuacionComponent},
  {path:'detalle/:id', component:DetalleComponent},
  {path:'carrera/:id', component:CarreraComponent},
  {path:'formMultiPasos', component:FormularioMultipasosComponent},
  {path:'agregarUniversidadMultiPasos', component:AgregarUniversidadMultiPasosComponent},
  {path: 'edicionUniversdiad/:id', component:EdicionComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarruselComponent,
    BarraDeBusquedaComponent,
    CuerpoComponent,
    FooterComponent,
    PrincipalComponent,
    AgregarInstitucionComponent,
    ContactoComponent,
    RegistroComponent,
    LoguinComponent,
    PuntuacionComponent,
    DetalleComponent,
    PromedioCalificacionComponent,
    CarreraComponent,
    ComentarioComponent,
    TopUniversidadesComponent,
    TopCarrerasComponent,
    RecargaDirective,
    ReaccionComponent,
    FormularioMultipasosComponent,
    AgregarUniversidadMultiPasosComponent,
    EdicionComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
