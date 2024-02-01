import { Component, OnInit } from '@angular/core';
import { ServicioProductosService } from '../../../services/servicio-productos.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoBack } from '../../../models/productoBack.model';
import { ServicioProveedoresService } from '../../../services/servicio-proveedores.service';

@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.component.html',
  styleUrl: './alta-productos.component.css',
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
    this.proveedoresService.getProveedores().subscribe((data) => {
      this.proveedores = data;
    });
    this.productosService.getCategorias().subscribe((data) => {
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

  guardarProducto(formulario: NgForm): void {
    if (formulario.valid) {
      if ((this.modificacion = false)) {
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
        this.productosService.guardarProducto(productoNuevo).subscribe();
        alert(this.producto.nombre_producto + ' se agregó correctamente');
        formulario.resetForm();
        this.router.navigate(['productos/listado-productos']);
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
          .subscribe((msj) => {
            console.log(msj);
          });
        formulario.reset();
      }
      this.router.navigate(['productos/listado-productos']);
    } else {
      alert('Debes completar todos los campos del formulario');
    }
  }

  resetearFormulario1(formulario: NgForm): void {
    formulario.resetForm();
  }

  codigoYaAgregado(codigo: string): boolean {
    const codigoExistente = this.productos.some(
      (producto) => codigo === producto.codigo
    );
    console.log(codigoExistente);
    return codigoExistente;
  }
}
