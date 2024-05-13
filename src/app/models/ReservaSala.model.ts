import { Alumno } from "./alumno.model";
import { Sala } from "./sala.model";
import { Usuario } from "./usuario.model";

export class ReservaSala{
    idReservaSala?: number;
    horaInicio?: Date;
    horaFin?: Date;
    alumno?: Alumno;
    sala?: Sala;
    usuarioRegistro? : Usuario;
}