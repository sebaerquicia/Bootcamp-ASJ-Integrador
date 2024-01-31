import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  guardarProducto(producto: ProductoBack): Observable<any> {
    return this.http.post(this.url, producto, {
      observe: 'response',
      responseType: 'text',
    });
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

  //OBTENGO EL PRODUCTO POR ID PARA MODIFICARLO
  public getProductoFormulario(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }
  //PETICION PARA ACTUALIZAR UN PROVEEDOR
  actualizarProducto(
    id: number,
    productoModificado: ProductoBack
  ): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.put(url, productoModificado, {
      observe: 'response',
      responseType: 'text',
    });
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
      if(id==0){
        return this.http.get(this.url);
  }
      return this.http.get(`${this.url}/categorias/${id}`);
  }
 
}
