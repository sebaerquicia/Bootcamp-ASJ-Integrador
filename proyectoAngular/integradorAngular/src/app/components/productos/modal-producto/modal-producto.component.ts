import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrl: './modal-producto.component.css',
})
export class ModalProductoComponent {
  @Input() producto: any;

  constructor(public modal: NgbActiveModal) {}
}
