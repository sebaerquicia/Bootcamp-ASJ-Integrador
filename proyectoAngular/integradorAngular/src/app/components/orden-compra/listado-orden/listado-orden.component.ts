import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Orden, ProductoOrden } from '../../../models/orden-compra.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioOrdenesCompraService } from '../../../services/servicio-ordenes-compra.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-listado-orden',
  templateUrl: './listado-orden.component.html',
  styleUrl: './listado-orden.component.css'
})


export class ListadoOrdenComponent {


  ordenes: Orden[]=[]


  constructor (private ordenesService: ServicioOrdenesCompraService, private router: Router, private route: ActivatedRoute,  private cdr: ChangeDetectorRef){}
  
  
  ngOnInit(): void {
  
   this.actualizarLista();
  }
  
  private actualizarLista() : void{
    this.ordenes = this.ordenesService.getOrdenes();
    this.cdr.detectChanges();
  }
  
  eliminarOrden(index: number): void {
    alert('Se eliminará la orden de compra')
    this.ordenesService.eliminarOrden(index);
    this.actualizarLista();

  }
  editarOrden(index: number, orden: Orden): void {
    this.ordenesService.actualizarOrden(index, orden);
    this.actualizarLista();
    this.router.navigate(['orden-compra/add-orden', { editarIndex: index }]);
   
  }

}
