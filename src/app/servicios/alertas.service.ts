import { Injectable } from '@angular/core';
import { UniversidadServiceService } from './universidad-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private uniService: UniversidadServiceService, private router: Router) { }

  alertaEliminacionUniversidad(idUniversidad: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Estas seguro?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.uniService.eliminarUniversidad(idUniversidad).subscribe(() => {
          swalWithBootstrapButtons.fire({
            title: "Eliminado!",
            text: "La universidad ha sido eliminada con exito",
            icon: "success"
          });
          this.router.navigate([""]);
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "La universidad esta a salvo:)",
          icon: "error"
        });
      }
    });
  }

  alertaTrabajoRealizado() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Trabajo realizado",
      showConfirmButton: false,
      timer: 1500
    });
  }

  alertaExitoComun(mensaje: string) {
    Swal.fire(mensaje);
  }

  alertaMensajeExito(titulo: string) {
    Swal.fire({
      title: titulo,
      //text: "You clicked the button!",
      icon: "success"
    });
  }

  alertaExito(texto: string) {
    Swal.fire({
      title: "Exito",
      text: texto,
      icon: "success"
    });
  }

  alertaError() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salio mal....!",
    });
  }

  alertaCuentaRegresiva(titulo: string, tiempo: number) {
    let timerInterval: any;
    Swal.fire({
      title: titulo,
      html: "Tiempo estimado <b></b> milisegundos.",
      timer: tiempo,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup()?.querySelector("b");
        timerInterval = setInterval(() => {
          if (timer)
            timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  }
}
