import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Sala } from '../models/sala.model';
import { Observable } from 'rxjs';


const baseUrlSala = AppSettings.API_ENDPOINT+ '/sala';
const baseUrlCrudSala = AppSettings.API_ENDPOINT+ '/crudSala';
const baseUrlConsultaSala = AppSettings.API_ENDPOINT+ '/consultaSala';

const baseUrl =  AppSettings.API_ENDPOINT + "/reservaSala";

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private http:HttpClient) { }

  registrar(data:Sala):Observable<any>{
    return this.http.post(baseUrlSala, data);
  }

  //PC2

  registrarCrud(data:Sala):Observable<any>{
    return this.http.post(baseUrlCrudSala + "/registraSala", data);
  }

  actualizarCrud(data:Sala):Observable<any>{
    return this.http.put(baseUrlCrudSala + "/actualizaSala", data);
  }

  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudSala + "/eliminaSala/"+id);
  }

  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudSala + "/listaSalaPorNumeroLike/" + filtro);
  }

  //PC3

  consultarSalaComplejo(num:string, est:number, sed:number, tip:number):Observable<any>{
    const params = new HttpParams()
    .set("numero", num)
    .set("estado", est)
    .set("idSede", sed)
    .set("idTipo", tip);

    return this.http.get(baseUrlConsultaSala+"/consultaSalaPorParametros", {params});
  }
  
  consultarFiltro(filtro:string,page:number, size:number):Observable<Sala[]>{
    return this.http.get<Sala[]>(baseUrl + '/listaSala/'+filtro+'?page='+ page+'&size=' + size); 
  }

}
