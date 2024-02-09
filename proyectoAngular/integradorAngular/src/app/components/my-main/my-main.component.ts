import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioProveedoresService } from '../../services/servicio-proveedores.service';
import { ServicioOrdenesCompraService } from '../../services/servicio-ordenes-compra.service';
import { ServicioProductosService } from '../../services/servicio-productos.service';

@Component({
  selector: 'app-my-main',
  templateUrl: './my-main.component.html',
  styleUrl: './my-main.component.css',
})
export class MyMainComponent implements OnInit {
  proveedores: any[] = [];
  productos: any[] = [];
  ordenes: any = [];

  cantProveedores: number = 0;
  cantProductos: number = 0;
  cantOrdenes: number = 0;

  constructor(
    private router: Router,
    private productosService: ServicioProductosService,
    private proveedoresService: ServicioProveedoresService,
    private ordenesService: ServicioOrdenesCompraService
  ) {}

  ngOnInit(): void {
    this.proveedoresService.getProveedoresActivos().subscribe((data) => {
      this.proveedores = data;
      this.contarProveedores();
    });

    this.productosService.getProductosActivos().subscribe((data) => {
      this.productos = data;
      this.contarProductos();
    });
    this.ordenesService.getOrdenesActivas().subscribe((data) => {
      this.ordenes = data;
      this.contarOrdenes();
    });
  }
  contarProveedores() {
    this.cantProveedores = this.proveedores.length;
  }

  contarProductos() {
    this.cantProductos = this.productos.length;
  }

  contarOrdenes() {
    this.cantOrdenes = this.ordenes.length;
  }


}
