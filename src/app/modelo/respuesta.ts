export class Respuesta {
    id:number=0;
    mensaje: string = "";
    fecha: Date = new Date();
    listaRespuesta?: Respuesta[];
    mostrarRespuestas:boolean = false;
    mostrarFormularioRespuesta:boolean = false;
}
