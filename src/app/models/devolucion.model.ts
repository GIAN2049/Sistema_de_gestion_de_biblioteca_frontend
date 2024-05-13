import { Alumno } from "./alumno.model";
import { DevolucionHasLibro } from "./devolucionHasLibro.model";
import { Usuario } from "./usuario.model";

export class Devolucion {
    idDevolucion?: number;
    fechaPrestamo?: Date;
    fechaDevolucion?: Date;
    alumno?: Alumno;
    usuario?: Usuario;
    detallesDevolucion?: DevolucionHasLibro[];
    
}