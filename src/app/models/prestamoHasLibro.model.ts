import { Libro } from "./libro.model";
import { PrestamoHasLibroPK } from "./prestamoHasLibroPK.model";

export class PrestamoHasLibro{

    fecha ?: Date;
    libro ?: Libro;
    prestamoHasLibroPK ?: PrestamoHasLibroPK;
    
}