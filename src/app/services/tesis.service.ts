import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Tesis } from '../models/tesis.model';
import { Observable } from 'rxjs';

const baseUrlTesis = AppSettings.API_ENDPOINT+ '/tesis';
const baseUrlCrudRevista = AppSettings.API_ENDPOINT+ '/crudTesis';
const baseUrlConsultaTesis = AppSettings.API_ENDPOINT+ '/consultaTesis';

@Injectable({
  providedIn: 'root'
})
export class TesisService {
  /*De la cruz programara aqui*/

  constructor(private http:HttpClient) { }
  registrar(data:Tesis):Observable<any>{
    return this.http.post(baseUrlTesis, data)
  }
  //PC2 - CRUD
  registrarCrud(data:Tesis):Observable<any>{
    return this.http.post(baseUrlCrudRevista+"/registraTesis", data);
  }
  actualizarCrud(data:Tesis):Observable<any>{
    return this.http.put(baseUrlCrudRevista+"/actualizaTesis", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudRevista+"/eliminaTesis/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudRevista+"/listaTesisPorNombreLike/"+ filtro);
  }

  consultarTesisComplejo(tit:string,  desde:string, hasta:string, est:number, t:number, i:number,c:number):Observable<any>{
    const params = new HttpParams()
    .set("titulo", tit)
    .set("fecDesde", desde)
    .set("fecHasta", hasta)
    .set("estado", est)
    .set("idTema", t)
    .set("idIdioma", i)
    .set("idCentroEstudio", c);

    return this.http.get(baseUrlConsultaTesis+"/consultaTesisPorParametros", {params});
  }

}
