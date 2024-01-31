import { Component, OnInit } from '@angular/core';
import { ServicioProveedoresService } from '../../../services/servicio-proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioProveedor } from '../../../models/proveedor.model';
import { NgForm } from '@angular/forms';
import { ProveedorBack } from '../../../models/proveedorBack.model';

@Component({
  selector: 'app-alta-proveedores',
  templateUrl: './alta-proveedores.component.html',
  styleUrl: './alta-proveedores.component.css',
})

export class AltaProveedoresComponent implements OnInit {
  proveedores: any[] = [];
  nuevoProveedor: ProveedorBack[]=[];
  condicionesIva: any[] = [];
  rubros: any[] = [];
  paises: any[] = [];
  provincias: any[] = [];
  modificacion = false;
  
   proveedor: ProveedorBack = {
    id: undefined,
    codigo_proveedor: '',
    rubro_proveedor: {
        id: null,
        nombre_rubro: ''
    },
    razon_social: '',
    provincia: {
        id: null,
        nombre_provincia: null,
        pais: {
            id: null,
            nombre_pais: null
        }
    },
    localidad: null,
    codigo_postal: null,
    calle: null,
    numero_calle: null,
    cuit_proveedor: '',
    contacto: {
        id: null,
        nombre_contacto: '',
        apellido_contacto: '',
        rol: null,
        telefono_contacto: '',
        email_contacto: '',
    },
    iva: {
        id: null,
        nombre_iva: ''
    },
    web: null,
    img: null,
    eliminado: false

}
  nombreValido = true;
  cuitValido = true;
  cpValido = true;

  constructor(
    public proveedoresService: ServicioProveedoresService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  id: any = '';



  ngOnInit(): void {
    this.proveedoresService.getProveedores().subscribe((data) => {
      this.proveedores = data;
    });
    this.proveedoresService.getCondicionesIva().subscribe((data) => {
      this.condicionesIva = data;
    });
    this.proveedoresService.getRubro().subscribe((data) => {
      this.rubros = data;
    });
    this.proveedoresService.getPaises().subscribe((data) => {
      this.paises = data;
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
    })

    if (this.id !== null){
      this.modificacion=true;
      this.proveedoresService.getProveedorFormulario(this.id).subscribe (provForm =>{
        this.proveedor = provForm;
        this.paisSeleccionado();

      })
    }
  }

  get modoEdicion(): boolean {
    return this.proveedoresService.modoEdicion;
  }

  get proveedorEnEdicion(): any {
    return this.proveedoresService.proveedorEnEdicion;
  }

  // Método para guardar proveedor
 guardarProveedor(formulario: NgForm): void {
    if (formulario.valid) {
      if(this.modificacion = false){
      const proveedorNuevo : ProveedorBack = {
      codigo_proveedor : formulario.value.codigo,
      razon_social : formulario.value.razonSocial,

      rubro_proveedor:{
        id: formulario.value.rubro,
      }, 
      web : formulario.value.web,
      cuit_proveedor : formulario.value.cuit,
      iva : {
        id:formulario.value.iva,
      },
      calle : formulario.value.calle,
      numero_calle : formulario.value.nrocalle,
      localidad : formulario.value.localidad,
      codigo_postal: formulario.value.cp,
      provincia:{
        id : formulario.value.provincia,
        pais:{
          id:formulario.value.pais
        }
      },
      contacto: {
        nombre_contacto : formulario.value.nombre,
        apellido_contacto: formulario.value.apellido,
        rol: formulario.value.rol,
        email_contacto: formulario.value.email,
        telefono_contacto: formulario.value.telefono
      },
      /* img : formulario.value.img,
       */

      }

        // Agrega el proveedor si está agregando
        if (this.razonAgregada(this.proveedor.razon_social)) {    
          alert(proveedorNuevo.razon_social + ": La razón social ya esta agregada." );
          return;
       }
       if (this.cuitYaAgregado(Number(this.proveedor.cuit_proveedor!))) {
        alert(`El cuit ${proveedorNuevo.cuit_proveedor} ya está agregado`);
        return;
     }
     this.proveedoresService.guardarProveedor(proveedorNuevo).subscribe()
        alert(this.proveedor.razon_social +' se agregó correctamente')
        formulario.resetForm();


      // Después de agregar/editar, regresar al listado de proveedores
      this.router.navigate(['proveedores/listado-proveedores']);

      } else {

        const proveedorModificado : ProveedorBack = {
          codigo_proveedor : formulario.value.codigo,
          razon_social : formulario.value.razonSocial,
    
          rubro_proveedor:{
            id: formulario.value.rubro,
          }, 
          web : formulario.value.web,
          cuit_proveedor : formulario.value.cuit,
          iva : {
            id:formulario.value.iva,
          },
          calle : formulario.value.calle,
          numero_calle : formulario.value.nrocalle,
          localidad : formulario.value.localidad,
          codigo_postal: formulario.value.cp,
          provincia:{
            id : formulario.value.provincia,
            pais:{
              id:formulario.value.pais
            }
          },
          contacto: {
            nombre_contacto : formulario.value.nombre,
            apellido_contacto: formulario.value.apellido,
            rol: formulario.value.rol,
            email_contacto: formulario.value.email,
            telefono_contacto: formulario.value.telefono
          },
          /* img : formulario.value.img,
           */
    
          }
          this.proveedoresService.actualizarProveedor(this.id, proveedorModificado).subscribe((msj) => {
            console.log(msj);
          });
          formulario.reset();
      }

// Después de agregar/editar, regresar al listado de proveedores
this.router.navigate(['proveedores/listado-proveedores']);


    } else {
      alert('Debes completar todos los campos del formulario'); 
    }
  }


  // Método para resetear formulario
  resetearFormulario(formulario: NgForm): void {
    formulario.resetForm();
  }

  // Métodos de validación y otros...

  validarNombre(): void {
  /*   const nombre = this.proveedor.razon_social;
    // Validar que tenga más de 4 letras y no contenga números
    this.nombreValido = nombre.length > 3 && !/\d/.test(nombre); */
  }
  validarCuit(): void {
/*     const cuit = this.proveedor.cuit_proveedor!.toString();
    this.cuitValido = /^\d{11}$/.test(cuit); */
  }
  validarCp(): void {
    /* const cp = this.proveedor.codigo_postal!.toString();
    // Validar que tenga entre 4 y 6 dígitos
    this.cpValido = /^\d{4,6}$/.test(cp); */
  }
  razonAgregada(nombre: string): boolean {
    const nombreExistente = this.proveedores.some(
      (proveedor) => proveedor.nombre === nombre
    );
    return nombreExistente;
  }
  cuitYaAgregado(cuit: number): boolean {
    const cuitExistente = this.proveedores.some(
      (proveedor) => proveedor.cuit === this.proveedor.cuit_proveedor
    );
    return cuitExistente;
  }

  paisSeleccionado() {
    this.proveedoresService
      .getProvinciaByIdPais(this.proveedor.provincia.pais.id)
      .subscribe((data) => {
        this.provincias = data;
      });
  }

}
