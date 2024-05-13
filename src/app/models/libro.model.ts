import { DataCatalogo } from "./dataCatalogo.model";
import { Editorial } from "./Editorial.model";
import { Usuario } from "./usuario.model";

export class Libro {

  idLibro ?: number;
  titulo ?: string;
  anio  ?: number;
  serie ?: string;
  categoriaLibro ?: DataCatalogo;
  tipoLibro ?: DataCatalogo;
  editorial ?: Editorial;
  estadoPrestamo ?: DataCatalogo;
  usuarioRegistro ?: Usuario;
  usuarioActualiza ?: Usuario;
  estado ?: number;
}
