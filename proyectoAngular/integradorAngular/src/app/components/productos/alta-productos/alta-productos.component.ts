import { Component, OnInit } from '@angular/core';
import { ServicioProductosService } from '../../../services/servicio-productos.service';
import { NgForm } from '@angular/forms';
import { Producto } from '../../../models/producto.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.component.html',
  styleUrl: './alta-productos.component.css',
})
export class AltaProductosComponent implements OnInit {
  constructor(
    public productosService: ServicioProductosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  proveedores: string[] = [];
 productos:any[]=[]
  public producto: Producto = {
    id: undefined,
    nombreProv: '',
    codigo: '',
    categoria: '',
    nombre: '',
    descripcion: '',
    precio: undefined,
    url: '',
  };

  ngOnInit(): void {
    this.proveedores = this.productosService.getNombresProveedores();

    const editarIndex = this.route.snapshot.paramMap.get('editarIndex');

    if (editarIndex !== null) {
      const index = parseInt(editarIndex, 10);

      if (
        !isNaN(index) &&
        index >= 0 &&
        index < this.productosService.productos.length
      ) {
        // Carga los datos del producto original al formulario
        this.producto = { ...this.productosService.productos[index] };
      }
    }
  }

  //modo de edicion
  get modoEdicion(): boolean {
    return this.productosService.modoEdicion;
  }
  get proveedorEnEdicion(): any {
    return this.productosService.productoEnEdicion;
  }


  guardarProducto(formulario: NgForm): void {
    if (formulario.valid) {
      const producto = formulario.value;
      producto.codigo = this.producto.codigo
      producto.nombreProv = this.producto.nombreProv
      const editarIndex = this.route.snapshot.paramMap.get('editarIndex');
      const index = editarIndex ? parseInt(editarIndex, 10) : -1;
      if (index !== -1) {
        // Actualiza el producto si está editando
        this.productosService.actualizarProducto(index, producto);
        alert(producto.nombre +': Se editó el producto correctamente')
        this.productosService.modoEdicion = false
      } else {
        // agrega el producto si está agregando     
        console.log(this.producto.codigo)
        if (this.codigoYaAgregado(this.producto.codigo)) {
          alert(producto.codigo +": El codigo ya existe");
          return;}
        this.productosService.guardarProducto(producto);
        alert(producto.nombre +': Se agregó el producto correctamente')
        formulario.reset();
      }

      this.router.navigate(['productos/listado-productos']);
    } else {
      alert('Debes completar todos los campos del formulario');
    }
  }
  
  resetearFormulario1(formulario: NgForm): void {
    formulario.resetForm();
  }


  codigoYaAgregado(codigo: string): boolean {
    const codigoExistente = this.productos.some(producto => codigo === producto.codigo)
    console.log(codigoExistente)
    return codigoExistente
 }
}
