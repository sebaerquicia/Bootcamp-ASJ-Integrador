import { TestBed } from '@angular/core/testing';

import { ServicioProveedoresService } from './servicio-proveedores.service';

describe('ServicioProveedoresService', () => {
  let service: ServicioProveedoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioProveedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


