import { Component, OnInit } from '@angular/core';
import { ServicioProveedoresService } from '../../../services/servicio-proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioProveedor } from '../../../models/proveedor.model';

@Component({
  selector: 'app-alta-proveedores',
  templateUrl: './alta-proveedores.component.html',
  styleUrl: './alta-proveedores.component.css',
})
export class AltaProveedoresComponent implements OnInit{
  proveedor: FormularioProveedor = {
    id: '',
    nombre: '',
    razonSocial: '',
    rubro: '',
    cuit: '',
    email: '',
  };
  constructor(private proveedoresService: ServicioProveedoresService, private router: Router, private route: ActivatedRoute) {}
/* opcion 1   
 ngOnInit(): void {
    // Recuperar el valor del parámetro de la ruta llamado 'editarIndex'
    const editarIndex = this.route.snapshot.paramMap.get('editarIndex');

    // Verificar si 'editarIndex' tiene un valor
    if (editarIndex !== null) {
      // Convertir el valor a un número (si es necesario)
      const index = parseInt(editarIndex, 10);

      // Verificar si el índice está dentro de los límites del array de proveedores
      if (!isNaN(index) && index >= 0 && index < this.proveedoresService.proveedores.length) {
        // Obtener el proveedor correspondiente al índice
        const proveedorEditar = this.proveedoresService.proveedores[index];

        // Verificar si se encontró el proveedor
        if (proveedorEditar) {
          // Preenchir el formulario con los datos del proveedor
          this.proveedor = { ...proveedorEditar };
        }
      }
    }
  } */
/*opcion 2   ngOnInit(): void {
    const editarIndex = this.route.snapshot.paramMap.get('editarIndex');

    if (editarIndex !== null) {
      const index = parseInt(editarIndex, 10);

      if (!isNaN(index) && index >= 0 && index < this.proveedoresService.proveedores.length) {
        this.proveedor = { ...this.proveedoresService.proveedores[index] };
      }
    }
  }

  agregarProveedor(): void {
    // Obtén el índice de la ruta
    const editarIndex = this.route.snapshot.paramMap.get('editarIndex');
    const index = editarIndex ? parseInt(editarIndex, 10) : -1;

    if (index !== -1) {
      // Actualiza el proveedor si está editando
      this.proveedoresService.eliminarProveedor(index);
      this.proveedoresService.actualizarProveedor(index, this.proveedor);
    } else {
      // Agrega el proveedor si está agregando
      this.proveedoresService.agregarProveedor(this.proveedor);
    }

    // Después de agregar/editar, regresar al listado de proveedores
    this.router.navigate(['proveedores/listado-proveedores']);
  } */
  ngOnInit(): void {
    const editarIndex = this.route.snapshot.paramMap.get('editarIndex');

    if (editarIndex !== null) {
      const index = parseInt(editarIndex, 10);

      if (!isNaN(index) && index >= 0 && index < this.proveedoresService.proveedores.length) {
        // Carga los datos del proveedor original al formulario
        this.proveedor = { ...this.proveedoresService.proveedores[index] };
      }
    }
  }

  agregarProveedor(): void {
    // Obtén el índice de la ruta
    const editarIndex = this.route.snapshot.paramMap.get('editarIndex');
    const index = editarIndex ? parseInt(editarIndex, 10) : -1;

    if (index !== -1) {
      // Actualiza el proveedor si está editando
      this.proveedoresService.actualizarProveedor(index, this.proveedor);
    } else {
      // Agrega el proveedor si está agregando
      this.proveedoresService.agregarProveedor(this.proveedor);
    }

    // Después de agregar/editar, regresar al listado de proveedores
    this.router.navigate(['proveedores/listado-proveedores']);
  }

/*   enviarFormulario() {
    this.proveedoresService.enviarLista(this.proveedor);

    alert('Se agregó correctamente el proveedor')
    this.resetearFormulario();
  } */
/*     irAListado(): void{
      this.router.navigate(['/listado-proveedores'])
    } */

  resetearFormulario() {
    this.proveedor = {
      id: '',
      nombre: '',
      razonSocial: '',
      rubro: '',
      cuit: '',
      email: '',
    };
  }
}
