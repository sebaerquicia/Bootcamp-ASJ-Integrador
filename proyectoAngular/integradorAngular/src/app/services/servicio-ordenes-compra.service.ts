import { Injectable } from '@angular/core';
import { Orden } from '../models/orden-compra.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioOrdenesCompraService {
  modoEdicionOrden: boolean = false;
  ordenEnEdicion: any;
  ordenes: Orden []=[]

  private ordenesKey = 'ordenes'

  getOrdenes(): any[] {
    const ordenesString = localStorage.getItem(this.ordenesKey);
    this.ordenes = ordenesString ? JSON.parse(ordenesString) : [];
    return this.ordenes
  }
  guardarOrden(orden: Orden): void {
    const ordenes = this.getOrdenes();
    ordenes.push(orden);
    localStorage.setItem(this.ordenesKey, JSON.stringify(ordenes));
   
  }
  eliminarOrden(index: number): void {
    const ordenes = this.getOrdenes();
    if (this.ordenes.length > 0){
      ordenes.splice(index, 1);
      localStorage.setItem(this.ordenesKey, JSON.stringify(ordenes));
    }
  }
  actualizarOrden(index: number, orden: Orden): void {
    this.modoEdicionOrden=true;
    const ordenes = this.getOrdenes()
    ordenes.splice(index, 1, orden);
    localStorage.setItem(this.ordenesKey, JSON.stringify(ordenes));

  }
}
