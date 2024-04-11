import { Respuesta } from "./respuesta";

export class Comentario {
     id:number=0;
     fecha: Date = new Date();
     mensaje: string = "";
     listaRespuesta?: Respuesta[];
     mostrarRespuestas:boolean = false;
     mostrarFormularioRespuesta:boolean = false;

    constructor(){}

    public setFecha(fecha:Date):void{
        this.fecha = fecha;
    }

    public getFecha():Date{
        return this.fecha;
    }

    public setMensaje(mensaje:string):void{
        this.mensaje = mensaje;
    }

    public getMensaje():string{
        return this.mensaje;
    }


    
}
