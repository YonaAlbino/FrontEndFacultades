export class Calificacion {
     nota:number = 0.0;
 

    constructor(){}

    public setNota(nota:number):void{
        this.nota = nota;
    }

    public getNota():number{
        return this.nota;
    }

  
}
