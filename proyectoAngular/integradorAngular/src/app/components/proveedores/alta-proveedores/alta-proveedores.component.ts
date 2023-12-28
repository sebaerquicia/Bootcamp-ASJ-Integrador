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

  proveedores:any[]=[]
  public proveedor: FormularioProveedor = {
    id: undefined,
    nombre: '',
    razonSocial: '',
    rubro: '',
    cuit: undefined,
    iva: '',
    calle: '',
    cp: undefined,
    localidad: '',
    provincia: '',
    pais: '',
    email: '',
    telefono: undefined,
  };


  //variables de validacion

  nombreValido=true;
  cuitValido=true;
  cpValido=true;

  constructor(
    public proveedoresService: ServicioProveedoresService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const proveedoresGuardados = localStorage.getItem('proveedores');
    this.proveedores = proveedoresGuardados ? JSON.parse(proveedoresGuardados) : [];


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
  get modoEdicion(): boolean {
    return this.proveedoresService.modoEdicion;
  }

  get proveedorEnEdicion(): any {
    return this.proveedoresService.proveedorEnEdicion;
  }

  //cuando apreto el boton agregar..
  guardarProveedor(formulario: NgForm): void {
    console.log(this.proveedor)
    console.log(formulario.valid)
    if (formulario.valid) {
    // Verifica si el nombre ya existe
    const nombreExistente = this.proveedores.some(proveedor => proveedor.nombre === this.proveedor.nombre);
    // Verificar si el CUIT ya existe
    const cuitExistente = this.proveedores.some(proveedor => proveedor.cuit === this.proveedor.cuit);

   /*  if (nombreExistente) {
     //
      console.log('El proveedor ' + this.proveedor.nombre + ' ya se encuentra cargado en sistema')
      return;
    }

    if (cuitExistente) {
      // 
      console.log('El cuit ' + this.proveedor.cuit + ' ya se encuentra cargado en sistema')
      return;
    } */
      const proveedor = formulario.value;
      proveedor.cuit = this.proveedor.cuit
      proveedor.id = this.proveedor.id
      const editarIndex = this.route.snapshot.paramMap.get('editarIndex');
      const index = editarIndex ? parseInt(editarIndex, 10) : -1;
      console.log(index)
      if (index !== -1) {
        
        // Actualiza el proveedor si está editando

        this.proveedoresService.actualizarProveedor(index, proveedor);
        alert('Se edito el proveedor correctamente')
        this.proveedoresService.modoEdicion = false
        
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


//reseteo de formulario
  resetearFormulario1(formulario: NgForm): void {
    formulario.resetForm();
  }


  //validaciones de los inputs con spans
  validarNombre(): void {
    const nombre = this.proveedor.nombre;
    // Validar que tenga más de 4 letras y no contenga números
    this.nombreValido = nombre.length > 3 && !/\d/.test(nombre);
  }
  validarCuit(): void {
    const cuit = this.proveedor.cuit!.toString();
    this.cuitValido = /^\d{11}$/.test(cuit);
  }
  validarCp(): void {
    const cp = this.proveedor.cp!.toString();

    // Validar que tenga entre 4 y 6 dígitos
    this.cpValido = /^\d{4,6}$/.test(cp);
  }
}
