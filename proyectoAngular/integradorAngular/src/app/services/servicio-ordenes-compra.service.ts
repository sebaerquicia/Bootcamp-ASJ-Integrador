import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { OrdenBack } from '../models/ordenBack.model';

@Injectable({
  providedIn: 'root',
})
export class ServicioOrdenesCompraService {
  modoEdicionOrden: boolean = false;
  ordenEnEdicion: any;

  private url = 'http://localhost:8080/ordenes_de_compra';

  private ordenesKey = 'ordenes';
  constructor(private http: HttpClient) {}

  getOrdenes(): Observable<any> {
    return this.http.get(this.url);
  }
  
  getOrdenesActivas(): Observable<any> {
    return this.http
      .get(this.url + '/activas')
      .pipe(catchError(this.handleError));
  }

  guardarOrden(orden: OrdenBack): Observable<any> {
    return this.http.post(this.url, orden, {
      observe: 'response',
      responseType: 'text',
    }).pipe(
      catchError(this.handleError)
    );
  }

  eliminarOrden(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id, {
      observe: 'response',
      responseType: 'text',
    });
  }

  getProveedores(): Observable<any> {
    return this.http.get('http://localhost:8080/proveedores');
  }

  getImagenProveedor(proveedorId: number): Observable<string> {
    return this.http.get<string>(`${this.url}/${proveedorId}/imagen`);
  }

  entregarOrden(id: number): Observable<any> {
    return this.http.put(this.url + '/entregada/' + id, {
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
