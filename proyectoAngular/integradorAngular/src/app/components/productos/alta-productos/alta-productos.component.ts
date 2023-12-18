import { Component } from '@angular/core';
import { ServicioProductosService } from '../../../services/servicio-productos.service';
@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.component.html',
  styleUrl: './alta-productos.component.css'
})
export class AltaProductosComponent {
  constructor(private servicioProductos: ServicioProductosService) {}

  public formularioProductos = {
      id: '',
      nombreProveedor:'',
      codigo:'',
      categoria: '',
      nombreProducto:'',
      descripcion: '',
      precio: '',
  };
  enviarFormulario() {
    console.log(this.formularioProductos)
    this.servicioProductos.enviarLista(this.formularioProductos);
    alert('Se agregó correctamente el proveedor')
    this.resetarFormulario();
  }
    resetarFormulario() {
      this.formularioProductos = {
        id: '',
        nombreProveedor:'',
        codigo:'',
        categoria: '',
        nombreProducto:'',
        descripcion: '',
        precio: '',
    };
    }
}
