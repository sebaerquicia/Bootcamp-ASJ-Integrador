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
/* export class AltaProveedoresComponent implements OnInit {

  proveedores:any[]=[]
  public proveedor: FormularioProveedor = {
    id: undefined,
    codigo_proveedor:'',
    razonSocial: '',
    rubro: '',
    web:'',
    cuit: undefined,
    iva: '',
    calle: '',
    nrocalle: undefined,
    cp: undefined,
    localidad: '',
    provincia: '',
    pais: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: undefined,
    rol:'',
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

  //OnInit
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
        // Carga los datos del prov al form
        this.proveedor = { ...this.proveedoresService.proveedores[index] };
      }
    }
  }

  //modo de edicion
  get modoEdicion(): boolean {
    return this.proveedoresService.modoEdicion;
  }
  get proveedorEnEdicion(): any {
    return this.proveedoresService.proveedorEnEdicion;
  }

  //Guardar proveedores
  guardarProveedor(formulario: NgForm): void {
    if (formulario.valid) {
      const proveedor = formulario.value;
      proveedor.cuit = this.proveedor.cuit
      proveedor.nombre = this.proveedor.nombre
      proveedor.codigo_proveedor = this.proveedor.codigo_proveedor
      const editarIndex = this.route.snapshot.paramMap.get('editarIndex');
      const index = editarIndex ? parseInt(editarIndex, 10) : -1;
      if (index !== -1) {
        // Actualiza el proveedor si está editando
        this.proveedoresService.actualizarProveedor(index, proveedor);
        alert('Se edito el proveedor correctamente: '+ proveedor.nombre )
        this.proveedoresService.modoEdicion = false        
      } else {
        // Agrega el proveedor si está agregando
        if (this.nombreYaAgregado(this.proveedor.nombre)) {    
          alert(proveedor.nombre + ": El nombre ya está agregado." );
          return;
       }
       if (this.cuitYaAgregado(this.proveedor.cuit!)) {
        alert(proveedor.cuit +": El cuit ya está agregado.");
        return;
     }
        this.proveedor.id = this.proveedores.length+1;
        this.proveedores.push(this.proveedor);
        this.proveedoresService.guardarProveedor(proveedor);
        alert(proveedor.nombre +': Se agregó el proveedor correctamente')
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
    const nombre = this.proveedor.razonSocial;
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

  //validacion por nombre
  nombreYaAgregado(nombre: string): boolean {
    const nombreExistente = this.proveedores.some(proveedor => proveedor.nombre === nombre);
    return nombreExistente
 }
 cuitYaAgregado(cuit: number):boolean {
  const cuitExistente = this.proveedores.some(proveedor => proveedor.cuit === this.proveedor.cuit);
  return cuitExistente
 }
}
 */

export class AltaProveedoresComponent implements OnInit {
  proveedores: any[] = [];
  condicionesIva: any[]=[];
  rubros:any[]=[];
  paises:any[]=[];
  provincias:any[]=[];
  public proveedor: FormularioProveedor = {
    id: undefined,
    codigo_proveedor:'',
    razonSocial: '',
    rubro: '',
    web:'',
    cuit: undefined,
    iva: '',
    calle: '',
    nrocalle: undefined,
    cp: undefined,
    localidad: '',
    provincia: '',
    pais: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: undefined,
    rol:'',
  };
  nombreValido=true;
  cuitValido=true;
  cpValido=true;

  constructor(
    public proveedoresService: ServicioProveedoresService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.proveedoresService.getProveedores().subscribe((data) => {
      this.proveedores = data;
    });

    const editarIndex = this.route.snapshot.paramMap.get('editarIndex');
    if (editarIndex !== null) {
      const index = parseInt(editarIndex, 10);
      if (
        !isNaN(index) &&
        index >= 0 &&
        index < this.proveedoresService.proveedores.length
      ) {
        this.proveedor = { ...this.proveedoresService.proveedores[index] };
      }
    }

    this.proveedoresService.getCondicionesIva().subscribe(data => {
      this.condicionesIva =data
    })
    this.proveedoresService.getRubro().subscribe(data => {
      this.rubros =data
    })
this.proveedoresService.getPaises().subscribe(data => {
  this.paises = data
})

  }




   guardarProveedor(formulario:NgForm) : void{
    console.log(this.proveedor)
   /*  this.proveedoresService.guardarProveedor(this.proveedor).subscribe(data => {
      this.proveedores = data;
    }) */

  }

  get modoEdicion(): boolean {
    return this.proveedoresService.modoEdicion;
  }

  get proveedorEnEdicion(): any {
    return this.proveedoresService.proveedorEnEdicion;
  }

  // Resto de tu código...

  // Método para guardar proveedor
 

  // Método para resetear formulario
  resetearFormulario1(formulario: NgForm): void {
    formulario.resetForm();
  }





  // Métodos de validación y otros...

  validarNombre(): void {
    const nombre = this.proveedor.razonSocial;
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
  nombreYaAgregado(nombre: string): boolean {
    const nombreExistente = this.proveedores.some(proveedor => proveedor.nombre === nombre);
    return nombreExistente
 }
 cuitYaAgregado(cuit: number):boolean {
  const cuitExistente = this.proveedores.some(proveedor => proveedor.cuit === this.proveedor.cuit);
  return cuitExistente
 }

 paisSeleccionado(){
    this.proveedoresService.getProvinciaByIdPais(this.proveedor.pais).subscribe(data =>{
      this.provincias = data
    })
 }

}
