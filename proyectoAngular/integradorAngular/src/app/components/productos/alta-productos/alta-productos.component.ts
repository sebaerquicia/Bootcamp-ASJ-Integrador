import { Component, OnInit } from '@angular/core';
import { ServicioProductosService } from '../../../services/servicio-productos.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoBack } from '../../../models/productoBack.model';
import { ServicioProveedoresService } from '../../../services/servicio-proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.component.html',
  styleUrls: ['./alta-productos.component.css'],
})
export class AltaProductosComponent implements OnInit {
  constructor(
    public productosService: ServicioProductosService,
    public proveedoresService: ServicioProveedoresService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  id: any = '';
  proveedores: any[] = [];
  productos: any[] = [];
  categorias: any[] = [];
  modificacion = false;

  public producto: ProductoBack = {
    id: undefined,
    proveedor: {
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
    },
    codigo_sku: '',
    categoria: {
      id: undefined,
      nombre_categoria: undefined,
    },
    nombre_producto: '',
    descripcion: '',
    precio_producto: undefined,
    url_img: '',
  };

  ngOnInit(): void {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data;
    });
    this.proveedoresService.getProveedoresActivos().subscribe((data) => {
      this.proveedores = data;
    });
    this.productosService.buscarCategoriasActivas().subscribe((data) => {
      this.categorias = data;
    });
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    if (this.id !== null) {
      this.modificacion = true;
      this.productosService
        .getProductoFormulario(this.id)
        .subscribe((prodForm) => {
          this.producto = prodForm;
          console.log(this.producto);
        });
    }
  }


  volver(){
    this.router.navigate(['productos/listado-productos']);
  }
  guardarProducto(formulario: NgForm): void {
    if (formulario.valid) {
      if (!this.modificacion) {
        this.mostrarConfirmacion(() => {
          const productoNuevo: ProductoBack = {
            nombre_producto: formulario.value.nombre,
            codigo_sku: formulario.value.codigo,
            proveedor: {
              id: formulario.value.proveed,
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
            },
            categoria: {
              id: formulario.value.categoria,
            },
            descripcion: formulario.value.descripcion,
            precio_producto: formulario.value.precio,
            url_img: formulario.value.url,
          };
          this.productosService.guardarProducto(productoNuevo).subscribe(
            () => {
              this.mostrarExitoAgregar();
              formulario.resetForm();
              this.router.navigate(['productos/listado-productos']);
            },
            (error) => {
              this.mostrarError(error);
            }
          );
        });
      } else {
        const productoModificado: ProductoBack = {
          nombre_producto: formulario.value.nombre,
          codigo_sku: formulario.value.codigo,
          proveedor: {
            id: formulario.value.proveed,
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
          },
          categoria: {
            id: formulario.value.categoria,
          },
          descripcion: formulario.value.descripcion,
          precio_producto: formulario.value.precio,
          url_img: formulario.value.url,
        };
        this.productosService
          .actualizarProducto(this.id, productoModificado)
          .subscribe(
            () => {
              this.mostrarExitoActualizar();
              formulario.reset();
              this.router.navigate(['productos/listado-productos']);
            },
            (error) => {
              // Mostrar alerta de error
              this.mostrarError(error);
            }
          );
      }
    } else {
      this.mostrarErrorDatosIncompletos();
    }
  }

  resetearFormulario(formulario: NgForm): void {
    formulario.resetForm();
  }

  //Mensajes de sweetalert
  mostrarConfirmacion(callback: () => void): void {
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title:
          '¿Desea agregar el producto ' + this.producto.nombre_producto + '?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, agregar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          callback();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'No se agregó el producto',
            'error'
          );
        }
      });
  }

  mostrarExitoAgregar(): void {
    Swal.fire('Agregado!', 'El producto fue agregado con éxito.', 'success');
  }

  mostrarExitoActualizar(): void {
    Swal.fire(
      'Actualizado!',
      'El producto fue actualizado con éxito.',
      'success'
    );
  }

  mostrarErrorDatosIncompletos(): void {
    Swal.fire(
      'Error',
      'Debes completar todos los campos del formulario correctamente',
      'error'
    );
  }
  private mostrarError(error: any): void {
    let errorMessage = 'SKU extistente';
    if (error && error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    Swal.fire('Error', errorMessage, 'error');
  }
}
