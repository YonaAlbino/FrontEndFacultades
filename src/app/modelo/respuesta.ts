import { Reaccion } from "./reaccion";

export class Respuesta {
    id:number=0;
    mensaje: string = "";
    fecha: Date = new Date();
    listaRespuesta?: Respuesta[];
    listaReaccion?:Reaccion[] = [];
    mostrarRespuestas:boolean = false;
    mostrarFormularioRespuesta:boolean = false;
}
