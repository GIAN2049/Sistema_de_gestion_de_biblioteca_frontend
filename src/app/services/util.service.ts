import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Alumno } from '../models/alumno.model';
import { Pais } from '../models/pais.model';
import { DataCatalogo } from '../models/dataCatalogo.model';
import { Editorial } from '../models/Editorial.model';
import { Usuario } from '../models/usuario.model';
import { Rol } from '../models/rol';
import {Opcion} from '../security/opcion';


const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http:HttpClient) { }

  listaPais():Observable<Pais[]>{
    return this.http.get<Pais[]>(baseUrlUtil+"/listaPais");
  }

  listaAlumno():Observable<Alumno[]>{
    return this.http.get<Alumno[]>(baseUrlUtil+"/listaAlumno");
  }

  listaCategoriaDeLibro():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaCategoriaDeLibro");
  }

  listaTipoProveedor():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaTipoProveedor");
  }

  listaModalidadAlumno():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaModalidadAlumno");
  }

  listaGradoAutor():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaGradoAutor");
  }

  listaTipoLibroRevista():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaTipoLibroRevista");
  }

  listaTipoSala():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaTipoSala");
  }

  listaSede():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaSede");
  }
  listaIdioma():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaIdioma");
  }


  listaEstadoReserva():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaEstadoReserva")
  }


  listaCentroEstudios():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaCentroEstudios");
  }

  listaTema():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaTema");
  }

  listaEditorial():Observable<Editorial[]>{
    return this.http.get<Editorial[]>(baseUrlUtil+"/listaEditorial");
  }

  listaEstadoLibro():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaEstadoLibro");
  }
  
  listaUsuario():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(baseUrlUtil+"/listaUsuario");
  }

  listaRol():Observable<Rol[]>{
    return this.http.get<Rol[]>(baseUrlUtil+"/listaRol");

  }
  listaOpcion():Observable<Opcion[]>{
    return this.http.get<Opcion[]>(baseUrlUtil+"/listaOpcion");

  }

}


