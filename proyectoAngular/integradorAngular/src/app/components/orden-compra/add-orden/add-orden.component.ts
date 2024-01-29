import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Orden } from '../../../models/orden-compra.model';
import { ProductoOrden } from '../../../models/orden-compra.model';
import { ServicioOrdenesCompraService } from '../../../services/servicio-ordenes-compra.service';
import { ServicioProductosService } from '../../../services/servicio-productos.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-add-orden',
  templateUrl: './add-orden.component.html',
  styleUrl: './add-orden.component.css',
})
export class AddOrdenComponent implements OnInit {
  constructor(
    private ordenesService: ServicioOrdenesCompraService,
    private productosService: ServicioProductosService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  proveedores: any[] = [];
  productos: any[] = [];
  productosFiltrados: Producto[] = [];
  proveedoresLocal: any[] = [];

  public orden: Orden = {
    nro: 0,
    fecha: '',
    fechaEntrega: '',
    informacion: '',
    proveedor: '',
    productos: [],
    total: 0,
  };

  ngOnInit(): void {

    const storedOrdenCompra = localStorage.getItem('ordenes');

    if (storedOrdenCompra) {
      this.orden = JSON.parse(storedOrdenCompra);
      this.orden.total =0
    }

    this.proveedores = this.productosService.getNombresProveedores();

    // Recuperar proveedores del localStorage
    const proveedoresString = localStorage.getItem('proveedores');
    this.proveedoresLocal = proveedoresString
      ? JSON.parse(proveedoresString)
      : [];

    // Recuperar productos del localStorage
    const productosString = localStorage.getItem('productos');
    this.productos = productosString ? JSON.parse(productosString) : [];

    const editarIndex = this.route.snapshot.paramMap.get('editarIndex');

    if (editarIndex !== null) {
      const index = parseInt(editarIndex, 10);

      if (
        !isNaN(index) &&
        index >= 0 &&
        index < this.ordenesService.ordenes.length
      ) {
        // Carga los datos del producto original al formulario
        this.orden = { ...this.ordenesService.ordenes[index] };
      }
    }
  }

  //modos de edicion
  get modoEdicion(): boolean {
    return this.ordenesService.modoEdicionOrden;
  }
  get ordenEnEdicion(): any {
    return this.ordenesService.ordenEnEdicion;
  }

  guardarOrden(formulario: NgForm): void {
    if (formulario.valid) {

      const orden = formulario.value;

      orden.fecha = this.orden.fecha;
      orden.nro = this.orden.nro;
      orden.proveedor = this.orden.proveedor;
      orden.productos = this.orden.productos;
      //valido la fecha
      if (this.orden.fecha > this.orden.fechaEntrega) {
        alert('La fecha de emisión debe ser anterior a la fecha de entrega.');
        return;}
      const editarIndex = this.route.snapshot.paramMap.get('editarIndex');
      const index = editarIndex ? parseInt(editarIndex, 10) : -1;
      if (index !== -1) {
        // Actualiza la orden si está editando
        this.ordenesService.actualizarOrden(index, orden);
       /*  this.compararFechas() */
        alert('Se editó la orden correctamente');
        this.ordenesService.modoEdicionOrden = false;
      } else {
        //primero valido que el numero de orden no exista
        const ordenesGuardadas = JSON.parse(localStorage.getItem('ordenes') || '[]');
        const numeroOrdenExistente = ordenesGuardadas.some((orden: any) => orden.nro === this.orden.nro);
        if (numeroOrdenExistente) {
          alert(orden.nro + ': El número de orden ya existe');
          return;
        }
        // Agrega el producto si está agregando
        this.ordenesService.guardarOrden(orden);

        alert(orden.nro + ': Se agregó la orden correctamente');
        /* formulario.reset(); */
        this.resetearFormulario1(formulario)
      }/*  */

      this.router.navigate(['orden-compra/listado-orden']);
    } else {
      alert('Debes completar todos los campos del formulario');
    }
  }

  // Filtrar la lista de productos según el proveedor seleccionado
  onProveedorSeleccionado(): void {
    const proveedorSeleccionado = this.orden.proveedor;

    if (proveedorSeleccionado) {
      this.productosFiltrados = this.productos.filter(
        (producto) => producto.nombreProv === proveedorSeleccionado
      );
    }
  }

  cargarProducto(producto: any, cantidad: any) {
    const nuevoProducto: ProductoOrden = {
      nombre: producto.nombre,
      cantidad: Number(cantidad),
      precio: Number(producto.precio),
    };
    if (!this.orden.productos) {
      this.orden.productos = [];
    }

    const productoRepetido = this.orden.productos.find(
      (prod) => prod.nombre == nuevoProducto.nombre
    );
 
    if (productoRepetido) {
    
      this.orden.total -= +productoRepetido.cantidad * producto.precio;
  
      
      productoRepetido.cantidad = nuevoProducto.cantidad;
    } else {
      
      this.orden.productos.push(structuredClone(nuevoProducto));
    }
    let total: number = +nuevoProducto.cantidad * producto.precio;
    this.orden.total += total;

    console.log(this.orden.total)
  }

  resetearFormulario1(formulario: NgForm): void {
    formulario.resetForm();
    this.orden = {
      nro: undefined,
      fecha: '',
      fechaEntrega: '',
      informacion: '',
      proveedor: '',
      productos: [],
      total: 0,
    };

    this.cdr.detectChanges();

  }


}
