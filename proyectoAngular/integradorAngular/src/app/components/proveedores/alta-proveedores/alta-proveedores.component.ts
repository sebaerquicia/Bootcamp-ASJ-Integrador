import { Component, OnInit } from '@angular/core';
import { ServicioProveedoresService } from '../../../services/servicio-proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProveedorBack } from '../../../models/proveedorBack.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-proveedores',
  templateUrl: './alta-proveedores.component.html',
  styleUrl: './alta-proveedores.component.css',
})
export class AltaProveedoresComponent implements OnInit {
  proveedores: any[] = [];
  nuevoProveedor: ProveedorBack[] = [];
  condicionesIva: any[] = [];
  rubros: any[] = [];
  paises: any[] = [];
  provincias: any[] = [];
  modificacion = false;
  razonSocialInvalid: boolean = false;
  cpInvalid: boolean = false;
  cuitInvalid: boolean = false;
  webInvalid: boolean = false;
  emailInvalid: boolean = false;
  nombreInvalid: boolean = false;
  apellidoInvalid: boolean = false;

  proveedor: ProveedorBack = {
    id: undefined,
    codigo_proveedor: '',
    rubro_proveedor: {
      id: null,
      nombre_rubro: '',
    },
    razon_social: '',
    provincia: {
      id: null,
      nombre_provincia: null,
      pais: {
        id: null,
        nombre_pais: null,
      },
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
      nombre_iva: '',
    },
    web: null,
    img: null,
    eliminado: false,
  };
  nombreValido = true;
  cuitValido = true;
  cpValido = true;

  constructor(
    public proveedoresService: ServicioProveedoresService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  id: any = null;

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

    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    if (this.id !== null) {
      this.modificacion = true;
      this.proveedoresService
        .getProveedorFormulario(this.id)
        .subscribe((provForm) => {
          this.proveedor = provForm;
          this.paisSeleccionado();
        });
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
    if (
      formulario.valid &&
      !this.razonSocialInvalid &&
      !this.cpInvalid &&
      !this.cuitInvalid &&
      !this.webInvalid &&
      !this.emailInvalid &&
      !this.nombreInvalid &&
      !this.apellidoInvalid
    ) {
      if (!this.modificacion) {
        this.mostrarConfirmacion(() => {
          const proveedorNuevo: ProveedorBack = {
            codigo_proveedor: formulario.value.codigo,
            razon_social: formulario.value.razonSocial,

            rubro_proveedor: {
              id: formulario.value.rubro,
            },
            web: formulario.value.web,
            cuit_proveedor: formulario.value.cuit,
            iva: {
              id: formulario.value.iva,
            },
            calle: formulario.value.calle,
            numero_calle: formulario.value.nrocalle,
            localidad: formulario.value.localidad,
            codigo_postal: formulario.value.cp,
            provincia: {
              id: formulario.value.provincia,
              pais: {
                id: formulario.value.pais,
              },
            },
            contacto: {
              nombre_contacto: formulario.value.nombre,
              apellido_contacto: formulario.value.apellido,
              rol: formulario.value.rol,
              email_contacto: formulario.value.email,
              telefono_contacto: formulario.value.telefono,
            },
            img: formulario.value.img,
          };

          // Agrega el proveedor si está agregando
          if (this.razonAgregada(this.proveedor.razon_social)) {
            alert(
              proveedorNuevo.razon_social +
                ': La razón social ya esta agregada.'
            );
            return;
          }
          if (this.cuitYaAgregado(Number(this.proveedor.cuit_proveedor!))) {
            alert(`El cuit ${proveedorNuevo.cuit_proveedor} ya está agregado`);
            return;
          }
          this.proveedoresService
            .guardarProveedor(proveedorNuevo)
            .subscribe((res) => {
              formulario.resetForm();
              this.router.navigate(['proveedores/listado-proveedores']);
              return res;
            });
        });
        this.mostrarExitoAgregar();
      } else {
        const proveedorModificado: ProveedorBack = {
          codigo_proveedor: formulario.value.codigo,
          razon_social: formulario.value.razonSocial,

          rubro_proveedor: {
            id: formulario.value.rubro,
          },
          web: formulario.value.web,
          cuit_proveedor: formulario.value.cuit,
          iva: {
            id: formulario.value.iva,
          },
          calle: formulario.value.calle,
          numero_calle: formulario.value.nrocalle,
          localidad: formulario.value.localidad,
          codigo_postal: formulario.value.cp,
          provincia: {
            id: formulario.value.provincia,
            pais: {
              id: formulario.value.pais,
            },
          },
          contacto: {
            nombre_contacto: formulario.value.nombre,
            apellido_contacto: formulario.value.apellido,
            rol: formulario.value.rol,
            email_contacto: formulario.value.email,
            telefono_contacto: formulario.value.telefono,
          },
          img: formulario.value.img,
        };
        this.proveedoresService
          .actualizarProveedor(this.id, proveedorModificado)
          .subscribe((msj) => {
            formulario.reset();
            this.router.navigate(['proveedores/listado-proveedores']);
            return msj;
          });
      }

      this.mostrarExitoActualizar();
    } else {
      this.mostrarErrorDatosIncompletos();
    }
  }

  // Método para resetear formulario
  resetearFormulario(formulario: NgForm): void {
    formulario.resetForm();
  }

  // Métodos de validación del Front

  validateRazonSocial(value: string) {
    if (value.length < 4) {
      this.razonSocialInvalid = true;
    } else {
      this.razonSocialInvalid = false;
    }
  }
  validarNombre(value: string) {
    this.nombreInvalid = value.length < 4 || !/^[a-zA-Z\s]*$/.test(value);
  }
  validarApellido(value: string) {
    this.apellidoInvalid = value.length < 4 || !/^[a-zA-Z\s]*$/.test(value);
  }

  validarCP(value: string) {
    this.cpInvalid =
      !value || value.length < 4 || value.length > 6 || !/^\d+$/.test(value);
  }

  validarCUIT(value: string | null) {
    if (value !== null && (value.length !== 11 || !/^\d+$/.test(value))) {
      this.cuitInvalid = true;
      console.log(this.cuitInvalid);
    } else {
      this.cuitInvalid = false;
    }
  }

  validarURL(value: string) {
    this.webInvalid = !value || !/^https?:\/\/(.*)$/.test(value);
  }

  //Validaciones del Back
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

  //Mensajes de sweetalert
  mostrarConfirmacion(callback: () => void): void {
    const swalWithBootstrapButtons = Swal.mixin({
 
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title:
          '¿Desea agregar al proveedor ' + this.proveedor.razon_social + '?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          callback();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'No se agregó al proveedor',
            'error'
          );
        }
      });
  }

  mostrarExitoAgregar(): void {
    Swal.fire('Agregado!', 'El proveedor fue agregado con éxito.', 'success');
  }

  mostrarExitoActualizar(): void {
    Swal.fire(
      'Actualizado!',
      'El proveedor fue actualizado con éxito.',
      'success'
    );
  }

  mostrarErrorDatosIncompletos(): void {
    Swal.fire(
      'Error',
      'Debes completar correctamente los campos del formulario',
      'error'
    );
  }
}
