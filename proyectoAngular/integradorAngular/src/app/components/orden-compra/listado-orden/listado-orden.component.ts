import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Orden, ProductoOrden } from '../../../models/orden-compra.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioOrdenesCompraService } from '../../../services/servicio-ordenes-compra.service';
import { DetalleOrdenBack, OrdenBack } from '../../../models/ordenBack.model';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalOrdenComponent } from '../modal-orden/modal-orden.component';
@Component({
  selector: 'app-listado-orden',
  templateUrl: './listado-orden.component.html',
  styleUrl: './listado-orden.component.css',
})
export class ListadoOrdenComponent {
  sumarTotal(orden: OrdenBack): number {
    return orden.detalles
      .map((detalle) => detalle.total)
      .reduce((a, b) => a! + b!)!;
  }
  ordenNueva: any[] = [];
  ordenes: OrdenBack[] = [];
  detalles: DetalleOrdenBack[] = [];
  filtroActivaEliminada: string = 'Todas';
  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private ordenesService: ServicioOrdenesCompraService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.actualizarLista();
  }

  private actualizarLista(): void {
    this.ordenesService.getOrdenes().subscribe((data) => {
      this.ordenes = data;
    });
  }

  eliminarOrden(id: any): void {
    alert('Se eliminará la orden');
    this.ordenesService.eliminarOrden(id).subscribe((msj) => {
      console.log(msj);
      this.actualizarLista();
    });
  }

  editarOrden(id: any): void {
    this.router.navigate(['/ordenes-compra/alta-ordenes/', { id }]);
  }
  filtrarOrdenes() {
    if (this.filtroActivaEliminada === 'Activas') {
      return this.ordenes.filter((orden) => !orden.eliminada);
    } else if (this.filtroActivaEliminada === 'Eliminadas') {
      return this.ordenes.filter((orden) => orden.eliminada);
    } else {
      return this.ordenes; 
    }
  }
  openModal(orden: OrdenBack): void {
    const modalRef = this.modalService.open(ModalOrdenComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.orden = orden;
  }
}
