import { Injectable } from "@angular/core";
import { AppSettings } from "../app.settings";
import { HttpClient } from "@angular/common/http";
import { ReservaSala } from "../models/ReservaSala.model";
import { Observable } from "rxjs";

const baseUrlReservaSala = AppSettings.API_ENDPOINT+ '/reservaSala';

@Injectable({
  providedIn: 'root'
})
export class ReservaSalaService {
  constructor(private http : HttpClient) { }

  registrarReserva(obj:ReservaSala):Observable<any>{
    return this.http.post(baseUrlReservaSala+ "/registrarReserva", obj);
  }

}
