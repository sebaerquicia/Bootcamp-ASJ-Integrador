import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Orden, ProductoOrden } from '../../../models/orden-compra.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioOrdenesCompraService } from '../../../services/servicio-ordenes-compra.service';
import { DetalleOrdenBack, OrdenBack } from '../../../models/ordenBack.model';


@Component({
  selector: 'app-listado-orden',
  templateUrl: './listado-orden.component.html',
  styleUrl: './listado-orden.component.css'
})


export class ListadoOrdenComponent {
sumarTotal(orden : OrdenBack ): number {
return orden.detalles.map(detalle=>detalle.total).reduce((a,b)=> a! + b!)!
}
  ordenNueva: any[]=[]
  ordenes: OrdenBack[]=[]
  detalles: DetalleOrdenBack[]=[]
  constructor (private ordenesService: ServicioOrdenesCompraService, private router: Router, private route: ActivatedRoute,  private cdr: ChangeDetectorRef){}
  
  ngOnInit(): void {
    this.actualizarLista(); 

  }
  
  private actualizarLista() : void{
    this.ordenesService.getOrdenes().subscribe((data)=> {
      this.ordenes = data
      console.log(this.ordenes)
    })
  }
  
  eliminarOrden(id: any): void {

      alert('Se eliminará la orden')
      this.ordenesService.eliminarOrden(id).subscribe(msj=> {console.log(msj)
      this.actualizarLista();
      });
    }
  
  editarOrden(id: any): void {
      this.router.navigate(['/ordenes-compra/alta-ordenes/',{id}])  
  }

}
