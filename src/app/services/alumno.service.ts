import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Alumno } from '../models/alumno.model';
import { Observable } from 'rxjs';


const baseUrlAlumno = AppSettings.API_ENDPOINT+ '/alumno';
const baseUrlCrudAlumno = AppSettings.API_ENDPOINT+ '/crudAlumno';
const baseUrlConsultaAlumno = AppSettings.API_ENDPOINT+ '/consultaAlumno';

const baseUrl =  AppSettings.API_ENDPOINT + "/prestamo";

@Injectable({
  providedIn: 'root'
})

export class AlumnoService {

  constructor(private http:HttpClient) { }

  //PC1-Registrar
  registrar(data:Alumno):Observable<any>{

        return this.http.post(baseUrlAlumno, data);
  }

  //CRUD
  registrarCrud(data:Alumno):Observable<any>{
    return this.http.post(baseUrlCrudAlumno+"/registraAlumno", data);
  }
  actualizarCrud(data:Alumno):Observable<any>{
    return this.http.put(baseUrlCrudAlumno+"/actualizaAlumno", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudAlumno+"/eliminaAlumno/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudAlumno+"/listaAlumnoPorNombreLike/"+ filtro);
  }
  //PC3 - CONSULTA

  consultarAlumnoComplejo(nom:string, ape:string, tel:string, cel:string, dni:string, cor:string, tip:string, desde:string, hasta:string, est:number, p:number, m:number):Observable<any>{
    const params = new HttpParams()
    .set("nombres", nom)
    .set("apellidos", ape)
    .set("telefono", tel)
    .set("celular", cel)
    .set("dni", dni)
    .set("correo", cor)
    .set("tipoSangre", tip)
    .set("fecDesde", desde)
    .set("fecHasta", hasta)
    .set("estado", est)
    .set("idPais", p)
    .set("idModalidad", m);

    return this.http.get(baseUrlConsultaAlumno+"/consultaAlumnoPorParametros", {params});
  }


  consultarFiltro(filtro:string,page:number, size:number):Observable<Alumno[]>{
    return this.http.get<Alumno[]>(baseUrl + '/listaAlumno/'+filtro+'?page='+ page+'&size=' + size); 

  }

  

}
