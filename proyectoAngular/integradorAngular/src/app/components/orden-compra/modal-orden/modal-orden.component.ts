import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { OrdenBack } from '../../../models/ordenBack.model';
@Component({
  selector: 'app-modal-orden',
  templateUrl: './modal-orden.component.html',
  styleUrl: './modal-orden.component.css'
})
export class ModalOrdenComponent {

  @Input() orden: any;

  constructor(public modal: NgbActiveModal) {
    
  }

    sumarTotal(orden: OrdenBack): number {
      return orden.detalles
        .map((detalle) => detalle.total)
        .reduce((a, b) => a! + b!)!;
    }
  
}
