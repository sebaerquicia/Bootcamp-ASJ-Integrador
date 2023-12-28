import { Injectable } from '@angular/core';
import { FormularioProveedor } from '../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioProveedoresService {
  modoEdicion: boolean = false;
  proveedorEnEdicion: any;
  proveedores: FormularioProveedor[] =[];
  
  private proveedoresKey = 'proveedores';
  
  getProveedores(): any[] {
    const proveedoresString = localStorage.getItem(this.proveedoresKey);
    this.proveedores = proveedoresString ? JSON.parse(proveedoresString) : [];
    return this.proveedores
  }
  guardarProveedor(proveedor: FormularioProveedor): void {
    const proveedores = this.getProveedores();
    proveedores.push(proveedor);
    localStorage.setItem(this.proveedoresKey, JSON.stringify(proveedores));
  }
  eliminarProveedor(index: number): void {
    const proveedores = this.getProveedores();
    if (this.proveedores.length > 0){
      proveedores.splice(index, 1);
      localStorage.setItem(this.proveedoresKey, JSON.stringify(proveedores));
    }
  }

  actualizarProveedor(index: number, proveedor: FormularioProveedor): void {
    this.modoEdicion=true;
    const proveedores = this.getProveedores()
    proveedores.splice(index, 1, proveedor);
    localStorage.setItem(this.proveedoresKey, JSON.stringify(proveedores));
   
  }

}
