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

  agregarProveedor(formulario:any): void {

      console.log('dsfsdf')
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
  resetearFormulario1(formulario:any): void{
    
    formulario.resetForm()
  }
}