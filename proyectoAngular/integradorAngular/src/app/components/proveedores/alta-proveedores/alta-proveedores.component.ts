import { Component, OnInit } from '@angular/core';
import { ServicioProveedoresService } from '../../../services/servicio-proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioProveedor } from '../../../models/proveedor.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-alta-proveedores',
  templateUrl: './alta-proveedores.component.html',
  styleUrl: './alta-proveedores.component.css',
})
export class AltaProveedoresComponent implements OnInit {
  public proveedor: FormularioProveedor = {
    id: '',
    nombre: '',
    razonSocial: '',
    rubro: '',
    cuit: '',
    iva: '',
    calle: '',
    cp: '',
    localidad: '',
    provincia: '',
    pais: '',
    email: '',
    telefono: '',
  };

  constructor(
    private proveedoresService: ServicioProveedoresService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const editarIndex = this.route.snapshot.paramMap.get('editarIndex');

    if (editarIndex !== null) {
      const index = parseInt(editarIndex, 10);

      if (
        !isNaN(index) &&
        index >= 0 &&
        index < this.proveedoresService.proveedores.length
      ) {
        // Carga los datos del proveedor original al formulario
        this.proveedor = { ...this.proveedoresService.proveedores[index] };
      }
    }
  }

  guardarProveedor(formulario: NgForm): void {
    if (formulario.valid) {
      // indice de la ruta
      const proveedor = formulario.value;
      console.log(proveedor);
      const editarIndex = this.route.snapshot.paramMap.get('editarIndex');
      const index = editarIndex ? parseInt(editarIndex, 10) : -1;

      if (index !== -1) {
        // Actualiza el proveedor si está editando

        this.proveedoresService.actualizarProveedor(index, proveedor);
        alert('Se edito el proveedor correctamente')
      } else {
        // Agrega el proveedor si está agregando
        this.proveedoresService.guardarProveedor(proveedor);
        alert('Se agregó el proveedor correctamente')
        formulario.reset();
      }

      // Después de agregar/editar, regresar al listado de proveedores
      this.router.navigate(['proveedores/listado-proveedores']);
    } else {
      alert('Debes completar todos los campos del formulario');
    }
  }
  /*  */
  resetearFormulario1(formulario: NgForm): void {
    formulario.resetForm();
  }
}
