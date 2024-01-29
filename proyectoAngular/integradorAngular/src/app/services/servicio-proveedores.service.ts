import { Injectable } from '@angular/core';
import { FormularioProveedor } from '../models/proveedor.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioProveedoresService {
  modoEdicion: boolean = false;
  proveedorEnEdicion: any;
  proveedores: FormularioProveedor[] =[];
  private url='http://localhost:8080/proveedores';
  private proveedoresKey = 'proveedores';

  constructor(private http: HttpClient){}
  
  /* getProveedores(): any[] {
    const proveedoresString = localStorage.getItem(this.proveedoresKey);
    this.proveedores = proveedoresString ? JSON.parse(proveedoresString) : [];
    return this.proveedores
  } */
  //GET PROVEEDORES
  getProveedores(): Observable<any> {
    return this.http.get(this.url);
  }

 /*  guardarProveedor(proveedor: FormularioProveedor): void {
    const proveedores = this.getProveedores();
    proveedores.push(proveedor);
    localStorage.setItem(this.proveedoresKey, JSON.stringify(proveedores));
  } */

  //POST
  guardarProveedor(proveedor: any): Observable<any> {
    return this.http.post(this.url, proveedor, {observe: 'response', responseType:'text'});
  }

/*   eliminarProveedor(index: number): void {
    const proveedores = this.getProveedores();
    if (this.proveedores.length > 0){
      proveedores.splice(index, 1);
      localStorage.setItem(this.proveedoresKey, JSON.stringify(proveedores));
    }
  } */
  eliminarProveedor(id: number): Observable<void> {
    const newUrl = `${this.url}/${id}`;
    return this.http.delete<void>(newUrl);
  }

/*   actualizarProveedor(index: number, proveedor: FormularioProveedor): void {
    this.modoEdicion=true;
    const proveedores = this.getProveedores()
    proveedores.splice(index, 1, proveedor);
    localStorage.setItem(this.proveedoresKey, JSON.stringify(proveedores));
   
  } */
  //put
  actualizarProveedor(id: number, proveedor: FormularioProveedor): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.put(url, proveedor, {observe: 'response', responseType:'text'});
  }



  // Obtener Selects desde la base de datos del back
  getCondicionesIva(): Observable <any>{
 return this.http.get('http://localhost:8080/condicionesiva');
  }

  getRubro(): Observable<any>{
    return this.http.get('http://localhost:8080/rubros');
  }

  getPaises():Observable<any>{
    return this.http.get('http://localhost:8080/paises');
  }
  getProvinciaByIdPais(id:string):Observable<any>{
    return this.http.get('http://localhost:8080/provincias/por_pais/' + id )
  }
}
