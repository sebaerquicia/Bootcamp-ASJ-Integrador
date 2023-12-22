import { Injectable } from '@angular/core';
import { proveedores } from '../data/proveedores';
import { FormularioProveedor } from '../models/proveedor.model';


/* let data = proveedores
 */
@Injectable({
  providedIn: 'root'
})
export class ServicioProveedoresService {
  proveedores: FormularioProveedor [] =[]
  obtenerProveedores(){
    return proveedores;
  }
  agregarProveedor(proveedor: FormularioProveedor): void {
    this.proveedores.push(proveedor);
  }

  eliminarProveedor(index: number): void {
    this.proveedores.splice(index, 1);
  }
  
  actualizarProveedor(index: number, proveedor: FormularioProveedor): void {
    this.proveedores[index] = proveedor;
  }


  enviarLista(proveedor: FormularioProveedor){
    console.log(proveedor)
    this.proveedores.push(proveedor)
  }

}
