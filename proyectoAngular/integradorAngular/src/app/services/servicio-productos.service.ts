import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductoBack } from '../models/productoBack.model';

@Injectable({
  providedIn: 'root',
})
export class ServicioProductosService {
  modoEdicion: boolean = false;
  productoEnEdicion: any;
  productos: ProductoBack[] = [];
  private url = 'http://localhost:8080/productos';
  constructor(private http: HttpClient) {}

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }


  getProductosActivos(): Observable<any> {
    return this.http
      .get(this.url + '/activos')
      .pipe(catchError(this.handleError));
  }

  
  guardarProducto(producto: ProductoBack): Observable<any> {
    return this.http
      .post(this.url, producto, {
        observe: 'response',
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id, {
      observe: 'response',
      responseType: 'text',
    });
  }

  getProveedores(): Observable<any> {
    return this.http.get('http://localhost:8080/proveedores');
  }

  getCategorias(): Observable<any> {
    return this.http.get('http://localhost:8080/categorias');
  }

  public getProductoFormulario(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  actualizarProducto(
    id: number,
    productoModificado: ProductoBack
  ): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http
      .put(url, productoModificado, {
        observe: 'response',
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }
  getNombresProveedores(): string[] {
    const proveedoresString = localStorage.getItem('proveedores');
    const proveedores = proveedoresString ? JSON.parse(proveedoresString) : [];

    if (!Array.isArray(proveedores)) {
      return [];
    }

    return proveedores.map((proveedor) => proveedor.razonSocial || '');
  }

  getProductosByIdCategoria(id: any): Observable<any> {
    if (id == 0) {
      return this.http.get(this.url);
    }
    return this.http.get(`${this.url}/categorias/${id}`);
  }

  getProductosByProveedorId(id: any): Observable<any> {
    if (id == 0) {
      return this.http.get(this.url);
    }
    return this.http.get(`${this.url}/proveedor/${id}`);
  }

  url_categorias = 'http://localhost:8080/categorias';

  public buscarCategoriasActivas(): Observable<any> {
    return this.http.get(this.url_categorias + '/activas');
  }

  public buscarCategoriaPorId(id: number): Observable<any> {
    return this.http.get(this.url_categorias + '/' + id);
  }

  public crearCategoria(categoria: any): Observable<any> {
    return this.http.post(this.url_categorias, categoria, {
      observe: 'response',
      responseType: 'text',
    });
  }

  public eliminarCategoria(id: number): Observable<any> {
    return this.http.delete(this.url_categorias + '/' + id, {
      observe: 'response',
      responseType: 'text',
    });
  }

  public modificarCategoria(id: number, categoria: any): Observable<any> {
    return this.http.put(this.url_categorias + '/' + id, categoria, {
      observe: 'response',
      responseType: 'text',
    });
  }


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
