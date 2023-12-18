import { Component, OnInit } from '@angular/core';
import { ServicioProductosService } from '../../../services/servicio-productos.service';



@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent implements OnInit{
  productos!: any[];


constructor (private productosService: ServicioProductosService){}
ngOnInit(): void {
 this.productos = this.productosService.obtenerProductos()
 console.log(this.productos)
}
}
