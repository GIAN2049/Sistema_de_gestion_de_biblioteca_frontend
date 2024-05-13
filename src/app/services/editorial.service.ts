import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Editorial } from '../models/Editorial.model';

const baseUrl = AppSettings.API_ENDPOINT + '/editorial';
const baseUrlCrudEditorial = AppSettings.API_ENDPOINT + '/crudEditorial';
const baseUrlConsultaEditorial = AppSettings.API_ENDPOINT + '/consultaEditorial';

@Injectable({
  providedIn: 'root',
})
export class EditorialService {
  constructor(private http: HttpClient) {}

  registrar(data: Editorial): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  registrarCrud(data: Editorial): Observable<any> {
    return this.http.post(baseUrlCrudEditorial + '/registraEditorial', data);
  }

  actualizaCrud(data: Editorial): Observable<any> {
    return this.http.put(baseUrlCrudEditorial + '/actualizaEditorial', data);
  }

  eliminarCrud(id: number): Observable<any> {
    return this.http.delete(baseUrlCrudEditorial + '/eliminarEditorial/' + id);
  }

  consultarCrud(filtro: string): Observable<any> {
    return this.http.get(
      baseUrlCrudEditorial + '/listaEditorialPorRazonLike/' + filtro
    );
  }

  //EF CONSULTA

  consultarRevistaComplejo(
    razonSocial: string,
    direccion: string,
    ruc: string,
    gerente: string,
    desde: string,
    hasta: string,
    est: number,
    pais: number 
  ): Observable<any> {
    const params = new HttpParams()
      .set('razonSocial', razonSocial)
      .set('direccion', direccion)
      .set('ruc', ruc)
      .set('gerente', gerente)
      .set('fdesde', desde)
      .set('fhasta', hasta)
      .set('estado', est)
      .set('idPais', pais)
    return this.http.get(
      baseUrlConsultaEditorial + '/consultaEditorialPorParametros',
      { params }
    );
  }
}
