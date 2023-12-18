import { Injectable } from '@angular/core';
import { productos } from '../data/productos';

let data = productos;

@Injectable({
  providedIn: 'root',
})
export class ServicioProductosService {
  lista = data;
  obtenerProductos() {
    return this.lista;
  }
  constructor() {}

  enviarLista(prod: any) {
    console.log(prod);
    this.lista.push(prod);
  }
}
