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
    
    public getId(): string {
        return this.id;
    }
    
    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(value: string): void {
        this.nombre = value;
    }

    public getGrado(): string {
        return this.grado;
    }

    public setGrado(value: string): void {
        this.grado = value;
    }

    public getDuracion(): string {
        return this.duracion;
    }

    public setDuracion(value: string): void {
        this.duracion = value;
    }

    public getListaCalificacion(): Calificacion[] | undefined {
        return this.listaCalificacion;
    }

    public setListaCalificacion(value: Calificacion[] | undefined): void {
        this.listaCalificacion = value;
    }

    public getListaComentarios(): Comentario[] | undefined {
        return this.listaComentarios;
    }

    public setListaComentarios(value: Comentario[] | undefined): void {
        this.listaComentarios = value;
    }

    public getActiva(): boolean {
        return this.activa;
    }

    public setActiva(value: boolean): void {
        this.activa = value;
    }

}
