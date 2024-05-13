import { Injectable } from '@angular/core';
import { Devolucion } from '../models/devolucion.model';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';

const baseUrl =  AppSettings.API_ENDPOINT + "/devolucion";

@Injectable({
  providedIn: 'root'
})

export class DevolucionService {

  constructor(private http:HttpClient) { }

  inserta(obj:Devolucion):Observable<any>{
    return this.http.post(baseUrl +"/registraDevolucion", obj);
}

}
