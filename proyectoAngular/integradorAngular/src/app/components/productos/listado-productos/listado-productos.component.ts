import { Component, OnInit } from '@angular/core';
import { ServicioProductosService } from '../../../services/servicio-productos.service';
import { Producto } from '../../../models/producto.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css',
})
export class ListadoProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productosService: ServicioProductosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.actualizarLista();
  }

  private actualizarLista(): void {
    this.productos = this.productosService.getProductos();
  }
  eliminarProducto(index: number): void {
    alert('Se eliminará el producto');
    this.productosService.eliminarProducto(index);
    this.actualizarLista();
    //Elimino el producto con el index desde el servicio
  }
  editarProducto(index: number, producto: Producto): void {
    this.productosService.actualizarProducto(index, producto);
    this.actualizarLista();
    this.router.navigate(['productos/alta-productos', { editarIndex: index }]);
  }
}
