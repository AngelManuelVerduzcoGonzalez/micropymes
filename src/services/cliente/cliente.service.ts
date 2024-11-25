import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
    private apiUrl = 'http://localhost:3000/api/clientes'; // URL de la API

  constructor(private http: HttpClient) { }

  getClientes(): Observable <any> {
    return this.http.get(this.apiUrl);
  }
  getClienteId(id: any): Observable <any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addCliente(cliente: any): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }

  deleteCliente(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateCliente(id: any, cliente: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }
}
