import { Component } from '@angular/core';
import { ServicioProveedoresService } from '../../../services/servicio-proveedores.service';

@Component({
  selector: 'app-alta-proveedores',
  templateUrl: './alta-proveedores.component.html',
  styleUrl: './alta-proveedores.component.css',
})
export class AltaProveedoresComponent {
  constructor(private servicioProveedores: ServicioProveedoresService) {}
/*   agregarProveedor: any[] = []; */

  public formularioProveedores = {
    id: '',
    nombre: '',
    razonSocial: '',
    rubro: '',
    cuit: '',
    email: '',
  };
  enviarFormulario() {
    /*  this.agregarProveedor.push({...this.formularioProveedores}) */
    this.servicioProveedores.enviarLista(this.formularioProveedores);
    /*  this.servicioProveedores.enviarLista(this.agregarProveedor) */
    alert('Se agregó correctamente el proveedor')
    this.resetarFormulario();
  }
  resetarFormulario() {
    this.formularioProveedores = {
      id: '',
      nombre: '',
      razonSocial: '',
      rubro: '',
      cuit: '',
      email: '',
    };
  }
}
