import { HttpClient, HttpParams } from "@angular/common/http";
import { Rol } from "../models/rol";
import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { Injectable } from "@angular/core";

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/asignacionRol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http:HttpClient) { }

  listaRolDeUsuario( id: string):Observable<Rol[]>{
    return this.http.get<Rol[]>(baseUrlUtil+"/listaRolPorUsuario/"+id);
  }
  registraRol( idUsuario: string, idRol: string):Observable<any>{
    const params = new HttpParams()
    .set("idUsuario", idUsuario)
    .set("idRol", idRol)
    return this.http.get<Rol[]>(baseUrlUtil+"/registraRol", {params});
  }
  eliminaRol( idUsuario: string, idRol: number):Observable<any>{
    const params = new HttpParams()
    .set("idUsuario", idUsuario)
    .set("idRol", idRol)
    return this.http.get<Rol[]>(baseUrlUtil+"/eliminaRol", {params});
  }
}
