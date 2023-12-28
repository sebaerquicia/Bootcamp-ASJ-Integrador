import { Component, OnInit } from '@angular/core';
import { Orden } from '../../../models/orden-compra.model';
import { ProductoOrden } from '../../../models/orden-compra.model';
import { ServicioOrdenesCompraService } from '../../../services/servicio-ordenes-compra.service';
import { ServicioProductosService } from '../../../services/servicio-productos.service';
import { ServicioProveedoresService } from '../../../services/servicio-proveedores.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../../models/producto.model';
import { FormularioProveedor } from '../../../models/proveedor.model';

@Component({
  selector: 'app-add-orden',
  templateUrl: './add-orden.component.html',
  styleUrl: './add-orden.component.css',
})
export class AddOrdenComponent implements OnInit {
  constructor(
    private ordenesService: ServicioOrdenesCompraService,
    private productosService: ServicioProductosService,
    private proveedoresService: ServicioProveedoresService,
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
    direccion: '',
    proveedor: '',
    productos: [],
    total: 0,
  };

  ngOnInit(): void {
    const storedOrdenCompra = localStorage.getItem('ordenes');
    if (storedOrdenCompra) {
      this.orden = JSON.parse(storedOrdenCompra);
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

  guardarOrden(formulario: NgForm): void {
   
    if (formulario.valid) {
      const orden = formulario.value
      orden.productos = this.orden.productos
      const editarIndex = this.route.snapshot.paramMap.get('editarIndex');
      const index = editarIndex ? parseInt(editarIndex, 10) : -1;
      if (index !== -1) {
        // Actualiza la orden si está editando
        this.ordenesService.actualizarOrden(index, orden);
        alert('Se editó la orden correctamente');
      } else {
        // Agrega el producto si está agregando
        this.ordenesService.guardarOrden(orden);
        console.log(orden)
        alert('Se agregó la orden correctamente');
        formulario.reset();
      }

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
    if(!this.orden.productos){
      this.orden.productos = []
    }

    const productoRepetido = this.orden.productos.find(prod => prod.nombre == nuevoProducto.nombre)
    if (productoRepetido){
      productoRepetido.cantidad = nuevoProducto.cantidad
    }else{

      this.orden.productos.push(structuredClone(nuevoProducto));
      
      this.orden.total += Number(nuevoProducto.cantidad * producto.precio);
      console.log(this.orden.total)
    }
  
  
  }

  resetearFormulario1(formulario: NgForm): void {
    formulario.resetForm();
  }
}
