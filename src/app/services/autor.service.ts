import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Autor } from '../models/autor.model';
import { Observable } from 'rxjs';

const baseUrlAutor = AppSettings.API_ENDPOINT+ '/autor';
const baseUrlCrudAutor  = AppSettings.API_ENDPOINT+ '/crudAutor';
const baseUrlConsultaAutor = AppSettings.API_ENDPOINT+ '/consultaAutor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private http:HttpClient) { }
  //PC1 - REGISTRAR
  registrar(data:Autor):Observable<any>{
    return this.http.post(baseUrlAutor, data);
  }

  //PC2 - CRUD
  registrarCrud(data:Autor):Observable<any>{
    return this.http.post(baseUrlCrudAutor+"/registraAutor", data);
 }

  actualizaCrud(data:Autor):Observable<any>{
  return this.http.put(baseUrlCrudAutor+"/actualizaAutor",data);
}

  eliminarCrud(id:number):Observable<any>{
  return this.http.delete(baseUrlCrudAutor+"/eliminaAutor/"+id);
}

  consultarCrud(filtro:string):Observable<any>{
  return this.http.get(baseUrlCrudAutor+"/listaAutorPorNombreLike/"+filtro);
}

 //PCFINAL - CONSULTAS
 consultarAutorComplejo(nom:string, ape:string, desde:string,
  hasta:string, est:number,ordic:string, p:number, g:number):Observable<any>{
  const params = new HttpParams()
  
  .set("nombres", nom)
  .set("apellidos", ape)
  .set("fecDesde", desde)
  .set("fecHasta", hasta)
  .set("orcid",ordic)
  .set("estado", est)
  .set("idPais", p)
  .set("idGrado", g);

  return this.http.get(baseUrlConsultaAutor+"/consultaAutorPorParametros", {params});
}

  }
