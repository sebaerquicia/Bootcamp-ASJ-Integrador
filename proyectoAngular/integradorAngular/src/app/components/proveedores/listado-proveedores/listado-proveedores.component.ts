import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicioProveedoresService } from '../../../services/servicio-proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorBack } from '../../../models/proveedorBack.model';
import { NgZone } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-proveedores',
  templateUrl: './listado-proveedores.component.html',
  styleUrl: './listado-proveedores.component.css',
})
export class ListadoProveedoresComponent implements OnInit {
  filtroRazonSocial: string = '';
  proveedores: any[] = [];
  filtroActivoEliminado: string = 'Todos';

  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private proveedoresService: ServicioProveedoresService,
    private router: Router,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.actualizarLista();
  }

  agregar(){
    this.router.navigate(['proveedores/alta-proveedores']);
  }

  filtrarProveedores() {
    if (this.filtroActivoEliminado === 'Activos') {
      return this.proveedores.filter((proveedor) => !proveedor.eliminado);
    } else if (this.filtroActivoEliminado === 'Eliminados') {
      return this.proveedores.filter((proveedor) => proveedor.eliminado);
    } else {
      return this.proveedores;
    }
  }

  private actualizarLista(): void {
    this.proveedoresService.getProveedores().subscribe((data) => {
      this.proveedores = data;
    });
  }

  eliminarProveedor(id: number): void {
    this.alertEliminar(id);
  }

  editarProveedor(id: any): void {
    this.router.navigate(['/proveedores/alta-proveedores/', { id }]);
  }

  openModal(proveedor: ProveedorBack): void {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    modalRef.componentInstance.proveedor = proveedor;
  }

  alertEliminar(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Desea eliminar el Proveedor?',
        text: '(Puedes revertir esta acción)',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.eliminarProveedorConfirmado(id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.cancelarEliminacion();
        }
      });
  }

  eliminarProveedorConfirmado(id: number): void {
    this.zone.run(() => {
      this.proveedoresService.eliminarProveedor(id).subscribe((msj) => {
        console.log(msj);
        this.actualizarLista();
        this.mostrarMensajeEliminado();
      });
    });
  }

  restaurarProveedor(id: any): void {
    this.proveedoresService.eliminarProveedor(id).subscribe(() => {
      this.actualizarLista();
      Swal.fire({
        icon: 'success',
        title: 'Proveedor restaurado',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
    });
  }
  cancelarEliminacion(): void {
    Swal.fire({
      title: 'Cancelado',
      text: '',
      icon: 'error',
    });
  }

  mostrarMensajeEliminado(): void {
    Swal.fire({
      title: 'Proveedor Eliminado',
      text: '(Puedes revertir esta acción)',
      icon: 'success',
    });
  }
}
