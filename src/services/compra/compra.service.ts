import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
    private apiUrl = 'http://localhost:3000/api/compras'; // URL de la API

  constructor(private http: HttpClient) { }

  getCompras(): Observable <any> {
    return this.http.get(this.apiUrl);
  }

  addCompra(compra: any): Observable<any> {
    return this.http.post(this.apiUrl, compra);
  }

  deleteCompra(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateCompra(id: any, compra: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, compra);
  }
}
