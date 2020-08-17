export class IngresoEgreso{

    public description: string;
    public monto: number;
    public tipo: string;

    constructor(description, monto, tipo ){
        this.description = description;
        this.monto = monto;
        this.tipo = tipo;

    }

}