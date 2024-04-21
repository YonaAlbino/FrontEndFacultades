import { Calificacion } from "./calificacion";
import { Comentario } from "./comentario";

export class Carrera {
    id:string;
    nombre: string;
    grado: string;
    duracion: string;
    listaCalificacion?: Calificacion[];
    listaComentarios?: Comentario[];
    activa:boolean;

}
