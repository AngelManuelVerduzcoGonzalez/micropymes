import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
    private apiUrl = 'http://localhost:3000/api/productos'; // URL de la API

  constructor(private http: HttpClient) { }

  getProductos(): Observable <any> {
    return this.http.get(this.apiUrl);
  }

  getProductosByProveedor(idProveedor: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idProveedor}`)
  }

  addProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  deleteProducto(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateProducto(id: any, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto);
  }
}
