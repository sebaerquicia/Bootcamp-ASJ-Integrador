import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Orden } from '../../../models/orden-compra.model';
import { ProductoOrden } from '../../../models/orden-compra.model';
import { ServicioOrdenesCompraService } from '../../../services/servicio-ordenes-compra.service';
import { ServicioProductosService } from '../../../services/servicio-productos.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../../models/producto.model';
import { DetalleOrdenBack, OrdenBack } from '../../../models/ordenBack.model';
import { ServicioProveedoresService } from '../../../services/servicio-proveedores.service';
import { ProductoBack } from '../../../models/productoBack.model';
import { ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-add-orden',
  templateUrl: './add-orden.component.html',
  styleUrl: './add-orden.component.css',
})
export class AddOrdenComponent implements OnInit {
  @ViewChild('productoSelect') productoSelect!: ElementRef;
  constructor(
    private ordenesService: ServicioOrdenesCompraService,
    private productosService: ServicioProductosService,
    private proveedoresService: ServicioProveedoresService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) { this.minDate = new Date();}
  minDate: Date;
  proveedores: any[] = [];
  productos: any[] = [];
  productosFiltrados: ProductoBack[] = [];
  proveedoresLocal: any[] = [];
  id: any = '';
  cantidadValida: boolean = false;
  modificacion: boolean = false;
  detallesProductos: any[] = [];
  selectProveedorBloqueado: boolean = false;

  public orden: OrdenBack = {
    id: undefined,
    numero_orden: undefined,
    estadoOrden: {
      id: undefined,
      nombre_estado: '',
    },
    fecha_emision: new Date(),
    fecha_entrega_esperada: undefined,
    informacion_orden: '',
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
    eliminada: false,
    detalles: [],
  };
  public detalle: DetalleOrdenBack = {
    id: undefined,
    producto: {
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
    },
    cantidad_producto: undefined,
    precio_hist: undefined,
    total: undefined,
  };

  ngOnInit(): void {
    this.proveedoresService.getProveedoresActivos().subscribe((data) => {
      this.proveedores = data;
    });
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    if (this.id !== null) {
      this.modificacion = true;
      this.productosService
        .getProductoFormulario(this.id)
        .subscribe((ordenForm) => {
          this.orden = ordenForm;
          console.log(this.orden);
        });
    }
  }

  onProveedorChange(id: any) {
    this.productosService.getProductosByProveedorId(id).subscribe((data) => {
      this.productosFiltrados = data;
    });
  }

  onProductoChange(productoId: any, cantidad: any) {
    this.llenarListado(productoId, cantidad);
  }

  llenarListado(productoId: any, cantidad: any) {
    this.cantidadValida = cantidad && cantidad !== 0;
    if (cantidad && cantidad !== 0) {

      const productoSeleccionado = this.productosFiltrados.find(
        (producto) => producto.id == productoId
      );

      const detalleExistente = this.detallesProductos.find(
        (detalle) => detalle.producto.id == productoId
      );
      if (detalleExistente) {
        // Si el producto ya existe, actualiza la cantidad
        detalleExistente.cantidad_producto += cantidad;
        detalleExistente.total =
          detalleExistente.cantidad_producto *
          productoSeleccionado!.precio_producto!;
      } else {
        const detalle : DetalleOrdenBack  = {
          producto: {
            id: productoId,
          nombre_producto: productoSeleccionado!.nombre_producto,
          codigo_sku: '',
          proveedor: {
            id: this.orden.proveedor.id,
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
            id: undefined,
          },
          descripcion: '',
          precio_producto: undefined,
          url_img: productoSeleccionado!.url_img,
        },
          cantidad_producto: cantidad,
          precio_hist: productoSeleccionado!.precio_producto,
          total: cantidad * productoSeleccionado!.precio_producto!,
        };

        this.detallesProductos.push(detalle);
      }
    }
    if (this.cantidadValida) {
      this.detalle.id = undefined;

      this.detalle.cantidad_producto = undefined;
      this.selectProveedorBloqueado = true;
      this.actualizarTotal();
    }
  }

  actualizarTotal() {
    this.detalle.total = this.detallesProductos.reduce(
      (total, detalle) => total + detalle.total,
      0
    );
  }
  eliminarProducto(productoId: any) {
    const indice = this.detallesProductos.findIndex(
      (detalle) => detalle.producto.id == productoId
    );
    if (indice !== -1) {
      this.detallesProductos.splice(indice, 1);
      this.actualizarTotal();
    }
  }

  guardarOrden(formulario: NgForm): void {

    if (formulario.valid) {

      if (!this.modificacion) {


        const ordenNueva: OrdenBack = {
          numero_orden: formulario.value.nro,
          informacion_orden: formulario.value.informacion,
          estadoOrden: {
            id: 1,
            nombre_estado: undefined,
          },
          proveedor: {
            id: this.orden.proveedor.id,
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
          fecha_emision: new Date(),
          fecha_entrega_esperada: formulario.value.fechaEntrega,
          detalles: this.detallesProductos
          
        };
        console.log(ordenNueva)
        this.ordenesService.guardarOrden(ordenNueva).subscribe();
        alert(this.orden.numero_orden + ' se agregó correctamente');
        this.resetearFormulario1(formulario);
        this.router.navigate(['ordenes-compra/listado-ordenes']);
      }
    }
  }
  /*          nombre_producto: formulario.value.nombre,
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
          url_img: formulario.value.url, */
  /*  };
        this.ordenesService.guardarOrden(ordenNueva).subscribe();
        alert(this.orden.numero_orden + ' se agregó correctamente');
        formulario.resetForm();
        this.router.navigate(['ordenes-compra/listado-ordenes']);
      } else {
        const ordenModificada: OrdenBack = { */
  /*   nombre_producto: formulario.value.nombre,
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
          url_img: formulario.value.url,*/
  /*         }; 
        this.ordenesService
          .actualizarOrden(this.id, ordenModificada)
          .subscribe((msj) => {
            console.log(msj);
          });
        formulario.reset();
      }
      this.router.navigate(['ordenes-compra/listado-ordenes']);
    } else {
      alert('Debes completar todos los campos del formulario');
    }
  } */
  //validacion de fecha
  /*   if (this.orden.fecha_emision! > this.orden.fecha_entrega_esperada!) {
    alert('La fecha de emisión debe ser anterior a la fecha de entrega.');
    return;} */
  /*guardarOrden(formulario: NgForm): void {
    if (formulario.valid) {

      const orden = formulario.value;

      //valido la fecha
      if (this.orden.fecha_emision! > this.orden.fecha_entrega_esperada!) {
        alert('La fecha de emisión debe ser anterior a la fecha de entrega.');
        return;}
      }}
      if (index !== -1) {
        // Actualiza la orden si está editando
        this.ordenesService.actualizarOrden(index, orden);
        this.compararFechas()
        alert('Se editó la orden correctamente');
        this.ordenesService.modoEdicionOrden = false;
      } else {
        //primero valido que el numero de orden no exista
        const ordenesGuardadas = JSON.parse(localStorage.getItem('ordenes') || '[]');
        const numeroOrdenExistente = ordenesGuardadas.some((orden: any) => orden.nro === this.orden.nro);
        if (numeroOrdenExistente) {
          alert(orden.nro + ': El número de orden ya existe');
          return;
        }
        // Agrega el producto si está agregando
        this.ordenesService.guardarOrden(orden);

        alert(orden.nro + ': Se agregó la orden correctamente');
        formulario.reset();
        this.resetearFormulario1(formulario)
      }
      this.router.navigate(['orden-compra/listado-orden']);
    } else {
      alert('Debes completar todos los campos del formulario');
    }
  }

  // Filtrar la lista de productos según el proveedor seleccionado
  onProveedorSeleccionado(): void {
    const proveedorSeleccionado = this.orden.proveedor;

    if (proveedorSeleccionado) {
      this.productosFiltrados = this.productos.filter(
        (producto) => producto.nombreProv === proveedorSeleccionado
      );
    }
  }

  cargarProducto(producto: any, cantidad: any) {
    const nuevoProducto: ProductoOrden = {
      nombre: producto.nombre,
      cantidad: Number(cantidad),
      precio: Number(producto.precio),
    };
    if (!this.orden.productos) {
      this.orden.productos = [];
    }

    const productoRepetido = this.orden.productos.find(
      (prod) => prod.nombre == nuevoProducto.nombre
    );
 
    if (productoRepetido) {
    
      this.orden.total -= +productoRepetido.cantidad * producto.precio;
  
      
      productoRepetido.cantidad = nuevoProducto.cantidad;
    } else {
      
      this.orden.productos.push(structuredClone(nuevoProducto));
    }
    let total: number = +nuevoProducto.cantidad * producto.precio;
    this.orden.total += total;

    console.log(this.orden.total)
  }

*/

  resetearFormulario1(formulario: NgForm): void {
    formulario.resetForm();
    this.detallesProductos = [];
    /* this.productoSelect.nativeElement.selectedIndex = 0; */
    this.selectProveedorBloqueado = false;
    this.actualizarTotal();
  }

}
