import { Pais } from "./pais.model";
import { Usuario } from "./usuario.model";

export class Editorial {

    idEditorial?: number;
    razonSocial?:string;
    direccion?:string;
    ruc?:string;
    gerente?:string;
    fechaCreacion?:Date
    pais?:Pais;
    estado?: number;
    usuarioRegistro?:Usuario;
    usuarioActualiza?:Usuario;
}
