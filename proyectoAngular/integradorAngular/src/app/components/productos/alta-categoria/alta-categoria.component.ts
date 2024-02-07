import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServicioProductosService } from '../../../services/servicio-productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-categoria',
  templateUrl: './alta-categoria.component.html',
  styleUrl: './alta-categoria.component.css'
})
export class AltaCategoriaComponent implements OnInit {

  constructor(
    private router: Router,
    private productosService : ServicioProductosService,
  ){}

  categorias : any[] = [];

  newCategoria : any = {
    id: 0,
    nombre_categoria: ""
  }

  ngOnInit(): void {
    this.productosService.getCategorias().subscribe( data => {
      this.categorias = data;
      console.log(this.categorias)
    })
  }


  crearCategoria(miForm:NgForm){
    if(miForm.valid){
      const categoria : any = {
        id : 0,
        nombre_categoria : miForm.value.nombre_categoria
      }
      console.log('value del form'+categoria.nombre_categoria);
      this.productosService.crearCategoria(categoria).subscribe( msj => {
        console.log(msj);
      })
      Swal.fire({
        title: "Categoria creado!",
        text: "La operacion fue exitosa.",
        icon: "success"
      });
      this.productosService.getCategorias().subscribe( data => {
        this.categorias = data;
        console.log(this.categorias)
      })
      this.ngOnInit();
    }else{
      Swal.fire({
        title: "Complete el campo!",
        text: "Ingrese un nombre para el Rubro.",
        icon: "error"
      });
    }
  }

  modificarCategoria(id : number, nombre_categoria : string){
    Swal.fire({
      title: 'Modificar Categoria',
      input: 'text',
      inputValue: nombre_categoria,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: (newValue: string) => {
        return new Promise<string>((resolve) => {
          const categoria: any = {
            id:null,
            nombre_categoria: newValue,
          
          };
          this.productosService.modificarCategoria(id,categoria).subscribe(
            (msj) => {
              console.log(categoria);
              console.log(msj);
              resolve(newValue);
            },
            (error) => {
              console.error(error);
              Swal.showValidationMessage(`Hubo un error al modificar la Categoria: ${error.nombre_categoria}`);
            }
          );
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Categoria Modificada',
            text: 'La Categoria, ha sido modificado correctamente.',
            icon: 'success'
          });
          this.productosService.getCategorias().subscribe( data => {
            this.categorias = data;
            console.log(this.categorias)
          });
          this.ngOnInit();
        }
      });
  }

  eliminarCategoria(idCategoria : number){
    Swal.fire({
      title: 'Eliminar Categoria',
      text: '¿Estás seguro de que deseas eliminar esta Categoria?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#dc3545', // Cambia el color del botón de confirmación según tu preferencia
      cancelButtonColor: '#6c757d', // Cambia el color del botón de cancelación según tu preferencia
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.productosService.eliminarCategoria(idCategoria).subscribe(
            (msj) => {
              console.log(msj);
            },
            (error) => {
              console.error(error);
              Swal.fire({
                title: 'Error',
                text: `Hubo un error al eliminar la categoria`,
                icon: 'error',
              });
            },
            () => {
              // Este bloque se ejecutará después de que se complete la operación, ya sea con éxito o con error.
              this.productosService.getCategorias().subscribe( data => {
                this.categorias = data;
                console.log(this.categorias)
              });
              this.ngOnInit();
            }
          );
        }
      });
  }

  darAltaCategoria(idCategoria:number){
    Swal.fire({
      title: 'Dar de alta Categoria',
      text: '¿Estás seguro de que deseas dar de alta esta Categoria?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, dar de alta',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#dc3545', // Cambia el color del botón de confirmación según tu preferencia
      cancelButtonColor: '#6c757d', // Cambia el color del botón de cancelación según tu preferencia
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.productosService.altaCategoria(idCategoria).subscribe(
            (msj) => {
              console.log(msj);
            },
            (error) => {
              console.error(error);
              Swal.fire({
                title: 'Error',
                text: `Hubo un error al activar la categoria: ${error}`,
                icon: 'error',
              });
            },
            () => {
              // Este bloque se ejecutará después de que se complete la operación, ya sea con éxito o con error.
              this.productosService.getCategorias().subscribe( data => {
                this.categorias = data;
                console.log(this.categorias)
              });
              this.ngOnInit();
            }
          );
        }
      });
  }




}