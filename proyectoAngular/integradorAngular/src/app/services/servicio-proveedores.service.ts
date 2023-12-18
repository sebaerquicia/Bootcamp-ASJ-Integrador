import { Injectable } from '@angular/core';
import { proveedores } from '../data/proveedores';


let data = proveedores;

@Injectable({
  providedIn: 'root'
})
export class ServicioProveedoresService {
  lista= data
  obtenerProveedores(){
    return this.lista;
  }
  constructor() { }

  enviarLista(prov:any){
    console.log(prov)
    this.lista.push(prov)
  }

}
