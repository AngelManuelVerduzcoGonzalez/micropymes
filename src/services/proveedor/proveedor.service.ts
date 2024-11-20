import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
    private apiUrl = 'http://localhost:3000/api/proveedores'; // URL de la API

  constructor(private http: HttpClient) { }

  getProveedores(): Observable <any> {
    return this.http.get(this.apiUrl);
  }

  addProveedores(proveedores: any): Observable<any> {
    return this.http.post(this.apiUrl, proveedores);
  }

  deleteProveedores(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateProveedores(id: any, proveedores: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, proveedores);
  }
}
