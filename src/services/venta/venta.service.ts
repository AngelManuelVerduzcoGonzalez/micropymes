import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
    private apiUrl = 'http://localhost:3000/api/ventas'; // URL de la API

  constructor(private http: HttpClient) { }

  getVentas(): Observable <any> {
    return this.http.get(this.apiUrl);
  }

  getVentasByCliente(idCliente: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente/${idCliente}`)
  }

  getVentasByProducto(idProducto: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/producto/${idProducto}`)
  }

  getVentasByDay(fecha: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/dia/${fecha}`)
  }

  getVentasByMonth(fecha: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/mes/${fecha}`)
  }

  getVentasByYear(year: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/ano/${year}`)
  }

  addVenta(venta: any): Observable<any> {
    return this.http.post(this.apiUrl, venta);
  }

  deleteVenta(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateVenta(id: any, venta: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, venta);
  }
}
