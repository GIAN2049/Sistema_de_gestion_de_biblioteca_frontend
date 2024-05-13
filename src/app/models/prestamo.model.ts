import { Alumno } from "./alumno.model";
import { PrestamoHasLibro } from "./prestamoHasLibro.model";
import { Usuario } from "./usuario.model";

export class Prestamo{
    idprestamo ?: number;
    fechaDevolucion ?: Date;
    alumno ?:Alumno;
    usuario ?: Usuario;
    fechaPrestamo ?: Date;
    detallesPrestamo ?: PrestamoHasLibro[];
}