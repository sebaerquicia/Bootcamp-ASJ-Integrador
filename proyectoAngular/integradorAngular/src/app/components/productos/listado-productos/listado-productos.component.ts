import { Component, OnInit } from '@angular/core';
import { ServicioProductosService } from '../../../services/servicio-productos.service';
import { Producto } from '../../../models/producto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoBack } from '../../../models/productoBack.model';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalProductoComponent } from '../modal-producto/modal-producto.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css',
})
export class ListadoProductosComponent implements OnInit {
  productos: ProductoBack[] = [];
  filtroActivoEliminado: string = 'Todos';
  categorias: any[]=[];
  filtroCategorias: number = 0;
  criterioOrdenamiento: string | null = null;

  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private productosService: ServicioProductosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
      config.backdrop = 'static';
      config.keyboard = false;
}
  ngOnInit(): void {
    this.actualizarLista();
    this.productosService.getCategorias().subscribe((data)=> {
      this.categorias = data


    })
  }
  public producto: ProductoBack = {
    id: undefined,
    proveedor:  {
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
  
  },
    codigo_sku: '',
    categoria: {
      id: undefined,
      nombre_categoria: undefined
    },
    nombre_producto: '',
    descripcion: '',
    precio_producto: undefined,
    url_img: '',
  };


  private actualizarLista(): void {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data;

    });
  }

  eliminarProducto(id: any): void {
    Swal.fire({
      title: 'Deseas eliminar el producto?'+ this.producto.nombre_producto,
      text: '(Puedes revertir esta acción)',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosService.eliminarProducto(id).subscribe(() => {
          this.actualizarLista();
          Swal.fire(
            'Eliminado',
            'El producto ha sido eliminado',
            'success'
          );
        });
      }
    });
  }
  
  restaurarProducto(id: any): void {
    this.productosService.eliminarProducto(id).subscribe(() => {
      this.actualizarLista();
      Swal.fire({
        icon: 'success',
        title: 'Producto restaurado',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    });
  }
  editarProducto(id: any): void {
    this.router.navigate(['/productos/alta-productos/', { id }]);
  }


  filtrarPorCategoria(id: any){
    if(id==0){
      this.actualizarLista()
    }
    this.productosService.getProductosByIdCategoria(id).subscribe((data) => {
      this.productos = data;
    });
  }
  openModal(producto: ProductoBack): void {
    const modalRef = this.modalService.open(ModalProductoComponent, { size: 'lg' });
    modalRef.componentInstance.producto= producto;
  }

  ordenarPorPrecio(ascendente: boolean): void {
    this.productos.sort((a, b) => {
      const precioA = a.precio_producto;
      const precioB = b.precio_producto;

      if (precioA! < precioB!) {
        return ascendente ? -1 : 1;
      } else if (precioA! > precioB!) {
        return ascendente ? 1 : -1;
      } else {
        return 0;
      }
    });

    this.criterioOrdenamiento = ascendente ? 'menorAMayor' : 'mayorAMenor';
  }
}
