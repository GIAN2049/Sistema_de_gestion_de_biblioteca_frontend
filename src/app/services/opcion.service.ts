import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { Injectable } from "@angular/core";
import { Opcion } from "../security/opcion";

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/asignacionOpcion';

@Injectable({
  providedIn: 'root'
})
export class OpcionService {

  constructor(private http:HttpClient) { }

  listaOpcionDeRol( id: string):Observable<Opcion[]>{
    return this.http.get<Opcion[]>(baseUrlUtil+"/listaOpcionPorRol/"+id);
  }
  registraOpcion( idRol: string, idOpcion: string):Observable<any>{
    const params = new HttpParams()
    .set("idOpcion", idOpcion)
    .set("idRol", idRol)
    return this.http.get<Opcion[]>(baseUrlUtil+"/registraOpcion", {params});
  }
  eliminaOpcion( idOpcion: string, idRol: number):Observable<any>{
    const params = new HttpParams()
    .set("idOpcion", idOpcion)
    .set("idRol", idRol)
    return this.http.get<Opcion[]>(baseUrlUtil+"/eliminaOpcion", {params});
  }
}