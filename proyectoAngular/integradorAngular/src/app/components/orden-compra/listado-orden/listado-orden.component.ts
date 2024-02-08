import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioOrdenesCompraService } from '../../../services/servicio-ordenes-compra.service';
import { DetalleOrdenBack, OrdenBack } from '../../../models/ordenBack.model';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalOrdenComponent } from '../modal-orden/modal-orden.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-orden',
  templateUrl: './listado-orden.component.html',
  styleUrls: ['./listado-orden.component.css'],
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminará la orden',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordenesService.eliminarOrden(id).subscribe((msj) => {
          console.log(msj);
          this.actualizarLista();
        });
        Swal.fire(
          '¡Eliminado!',
          'La orden ha sido eliminada correctamente.',
          'success'
        );
      }
    });
  }
  restaurarOrden(id: any): void {
    this.ordenesService.eliminarOrden(id).subscribe(() => {
      this.actualizarLista();
      Swal.fire({
        icon: 'success',
        title: 'Orden restaurada',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
    });
  }

  editarOrden(id: any): void {
    this.router.navigate(['/ordenes-compra/alta-ordenes/', { id }]);
  }

  ordenEntregada(id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'La orden quedará entregada y no se podrá modificar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, entregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordenesService.entregarOrden(id).subscribe((msj) => {
          console.log(msj);
          this.ngOnInit();
        });
        Swal.fire(
          '¡Entregada!',
          'La orden ha sido entregada correctamente.',
          'success'
        );
      }
    });
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

  mostrarMensajeEliminado(): void {
    Swal.fire({
      title: 'Orden Eliminada',
      text: '(Puedes revertir esta acción)',
      icon: 'success',
    });
  }
}
