import { Calificacion } from "./calificacion";
import { Carrera } from "./carrera";
import { Comentario } from "./comentario";

export class Universidad {
    id: number = 0;
    nombre: string = "";
    imagen: string = "";
    direccion: string = "";
    descripcion: string = "";
    direccionWeb: string = "";
    listaCarreras?: Carrera[];
    listaCalificacion?: Calificacion[];
    listaComentarios?: Comentario[];


    // Getters

    constructor() { }

    public getId(): number {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getImagen(): string {
        return this.imagen;
    }

    public getDireccion(): string {
        return this.direccion;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public getDireccionWeb(): string {
        return this.direccionWeb;
    }

    public getListaCarreras(): Carrera[] | undefined {
        return this.listaCarreras;
    }

    public getListaCalificacion(): Calificacion[] | undefined {
        return this.listaCalificacion;
    }

    public getListaComentarios(): Comentario[] | undefined {
        return this.listaComentarios;
    }

    // Setters
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setImagen(imagen: string): void {
        this.imagen = imagen;
    }

    public setDireccion(direccion: string): void {
        this.direccion = direccion;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    public setDireccionWeb(direccionWeb: string): void {
        this.direccionWeb = direccionWeb;
    }

    public setListaCarreras(listaCarreras: Carrera[] | undefined): void {
        this.listaCarreras = listaCarreras;
    }

    public setListaCalificacion(listaCalificacion: Calificacion[] | undefined): void {
        this.listaCalificacion = listaCalificacion;
    }

    public setListaComentarios(listaComentarios: Comentario[] | undefined): void {
        this.listaComentarios = listaComentarios;
    }
}
