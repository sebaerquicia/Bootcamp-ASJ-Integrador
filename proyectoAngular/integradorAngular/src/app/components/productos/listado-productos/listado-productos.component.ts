import { Component, OnInit } from '@angular/core';
import { ServicioProductosService } from '../../../services/servicio-productos.service';
import { Producto } from '../../../models/producto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoBack } from '../../../models/productoBack.model';

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
  constructor(
    private productosService: ServicioProductosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
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
    alert('Se eliminará el producto');
    this.productosService
      .eliminarProducto(id)
      .subscribe((msj) => {console.log(msj)
        this.actualizarLista()
      }
      );
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
}
