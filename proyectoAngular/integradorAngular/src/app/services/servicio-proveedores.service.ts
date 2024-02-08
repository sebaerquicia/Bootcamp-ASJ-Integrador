import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProveedorBack } from '../models/proveedorBack.model';

@Injectable({
  providedIn: 'root',
})
export class ServicioProveedoresService {
  modoEdicion: boolean = false;
  proveedorEnEdicion: any;
  proveedores: ProveedorBack[] = [];
  private url = 'http://localhost:8080/proveedores';

  constructor(private http: HttpClient) {}

  //GET PROVEEDORES
  getProveedores(): Observable<any> {
    return this.http.get(this.url).pipe(catchError(this.handleError));
  }

  getProveedoresActivos(): Observable<any> {
    return this.http
      .get(this.url + '/activos')
      .pipe(catchError(this.handleError));
  }

  //POST
  guardarProveedor(proveedor: ProveedorBack): Observable<any> {
    return this.http
      .post(this.url, proveedor, { observe: 'response', responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  eliminarProveedor(id: number): Observable<any> {
    return this.http
      .delete(this.url + '/' + id, {
        observe: 'response',
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  //PETICION PARA ACTUALIZAR UN PROVEEDOR
  actualizarProveedor(
    id: number,
    proveedorModificado: ProveedorBack
  ): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http
      .put(url, proveedorModificado, {
        observe: 'response',
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  //OBTENGO EL PROVEEDOR POR ID PARA MODIFICARLO
  public getProveedorFormulario(id: number): Observable<any> {
    return this.http
      .get(this.url + '/' + id)
      .pipe(catchError(this.handleError));
  }

  // Obtener SELECTS desde la base de datos del back
  getCondicionesIva(): Observable<any> {
    return this.http
      .get('http://localhost:8080/condicionesiva')
      .pipe(catchError(this.handleError));
  }

  getRubro(): Observable<any> {
    return this.http
      .get('http://localhost:8080/rubros')
      .pipe(catchError(this.handleError));
  }

  getPaises(): Observable<any> {
    return this.http
      .get('http://localhost:8080/paises')
      .pipe(catchError(this.handleError));
  }

  getProvinciaByIdPais(id: number | null): Observable<any> {
    return this.http
      .get('http://localhost:8080/provincias/por_pais/' + id)
      .pipe(catchError(this.handleError));
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error en la aplicación';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.error}`;
    }
    return throwError(errorMessage);
  }
}
