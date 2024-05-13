import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro.model';

const baseUrlLibro = AppSettings.API_ENDPOINT+ '/libro';
const baseUrlCrudLibro = AppSettings.API_ENDPOINT+ '/crudLibro'

const baseUrlConsultaLibro = AppSettings.API_ENDPOINT+ '/consultaLibro'
const baseUrl = AppSettings.API_ENDPOINT+ '/prestamo';


@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private http:HttpClient) { }

  registrar(data:Libro):Observable<any>{
        return this.http.post(baseUrlLibro, data);
  }


  registrarCrud(data:Libro):Observable<any>{
    return this.http.post(baseUrlCrudLibro+"/registraLibro", data);
  }
  actualizarCrud(data:Libro):Observable<any>{
    return this.http.put(baseUrlCrudLibro+"/actualizaLibro", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudLibro+"/eliminaLibro/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudLibro+"/listaLibroPorTituloLike/"+ filtro);
  }
    //PC3 - Consulta
consultaLibroComplejo(titu:string, /*ani:number,*/ seri:string,
                        est:number, c:number, e:number, t:number):Observable<any>{
  const params = new HttpParams()
  .set("titulo", titu)
  //.set("anio", ani)
  .set("serie", seri)
  .set("estado", est)
  .set("idCategoria", c)
  .set("idEditorial", e)
  .set("idTipo", t);

  return this.http.get(baseUrlConsultaLibro+"/consultaLibroPorParametros", {params});
  }

  consultaFiltro(filtro:string, page: number, size: number):Observable<Libro[]>{
    return  this.http.get<Libro[]>(baseUrl +'/listaLibro/'+filtro+'?page='+ page+'&size=' + size); 
  } 

}
