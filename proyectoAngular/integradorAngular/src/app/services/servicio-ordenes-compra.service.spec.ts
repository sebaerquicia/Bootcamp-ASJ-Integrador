import { TestBed } from '@angular/core/testing';

import { ServicioOrdenesCompraService } from './servicio-ordenes-compra.service';

describe('ServicioOrdenesCompraService', () => {
  let service: ServicioOrdenesCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioOrdenesCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
