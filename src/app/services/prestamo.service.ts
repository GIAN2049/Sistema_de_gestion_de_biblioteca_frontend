import { Injectable } from '@angular/core';
import { Prestamo } from '../models/prestamo.model';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';

const baseUrl =  AppSettings.API_ENDPOINT + "/prestamo";

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(private http:HttpClient) { }

  inserta(obj:Prestamo):Observable<any>{
    return this.http.post(baseUrl +"/registraPrestamo", obj);
}
}
