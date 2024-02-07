import { Injectable } from '@angular/core';
import { Orden } from '../models/orden-compra.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrdenBack } from '../models/ordenBack.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioOrdenesCompraService {
  modoEdicionOrden: boolean = false;
  ordenEnEdicion: any;
  ordenes: Orden []=[]
  private url = 'http://localhost:8080/ordenes_de_compra';

  private ordenesKey = 'ordenes'
  constructor(private http: HttpClient) {}

  getOrdenes(): Observable<any> {
    return this.http.get(this.url);
  }

  guardarOrden(orden: OrdenBack): Observable<any> {
    return this.http.post(this.url, orden, {
      observe: 'response',
      responseType: 'text',
    });
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

  /*  getOrdenes(): any[] {
    const ordenesString = localStorage.getItem(this.ordenesKey);
    this.ordenes = ordenesString ? JSON.parse(ordenesString) : [];
    return this.ordenes
  } */

/*   guardarOrden(orden: Orden): void {
    const ordenes = this.getOrdenes();
    ordenes.push(orden);
    localStorage.setItem(this.ordenesKey, JSON.stringify(ordenes));
   
  } */

/*   eliminarOrden(index: number): void {
    const ordenes = this.getOrdenes();
    if (this.ordenes.length > 0){
      ordenes.splice(index, 1);
      localStorage.setItem(this.ordenesKey, JSON.stringify(ordenes));
    }
  } */
/*   actualizarOrden(index: number, orden: Orden): void {
    this.modoEdicionOrden=true;
    const ordenes = this.getOrdenes()
    ordenes.splice(index, 1, orden);
    localStorage.setItem(this.ordenesKey, JSON.stringify(ordenes));

  } */
}
