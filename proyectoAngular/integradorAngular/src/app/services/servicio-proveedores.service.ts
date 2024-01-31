import { Injectable } from '@angular/core';
import { FormularioProveedor } from '../models/proveedor.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProveedorBack } from '../models/proveedorBack.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioProveedoresService {
  modoEdicion: boolean = false;
  proveedorEnEdicion: any;
  proveedores: ProveedorBack[] =[];
  private url='http://localhost:8080/proveedores';
  private proveedoresKey = 'proveedores';
  constructor(private http: HttpClient){}
  
  //GET PROVEEDORES
  getProveedores(): Observable<any> {
    return this.http.get(this.url);
  }

  //POST
  guardarProveedor(proveedor: ProveedorBack): Observable<any> {
    return this.http.post(this.url, proveedor, {observe: 'response', responseType:'text' });
  }

  eliminarProveedor(id: number): Observable<any> {
    return this.http.delete(this.url+"/"+id,{ observe:'response', responseType:'text' })
  }

  //PETICION PARA ACTUALIZAR UN PROVEEDOR
  actualizarProveedor(id: number, proveedorModificado: ProveedorBack): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.put(url, proveedorModificado, {observe: 'response', responseType:'text'});
  }

    //OBTENGO EL PROVEEDOR POR ID PARA MODIFICARLO
    public getProveedorFormulario(id:number) : Observable <any>{
      return this.http.get(this.url+"/"+id);
    }

  // Obtener SELECTS desde la base de datos del back
  getCondicionesIva(): Observable <any>{
 return this.http.get('http://localhost:8080/condicionesiva');
  }

  getRubro(): Observable<any>{
    return this.http.get('http://localhost:8080/rubros');
  }

  getPaises():Observable<any>{
    return this.http.get('http://localhost:8080/paises');
  }
  getProvinciaByIdPais(id:number | null):Observable<any>{
    return this.http.get('http://localhost:8080/provincias/por_pais/' + id )
  }
}
