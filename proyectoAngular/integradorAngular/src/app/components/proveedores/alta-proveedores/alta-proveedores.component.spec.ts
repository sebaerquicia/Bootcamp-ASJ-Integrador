import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaProveedoresComponent } from './alta-proveedores.component';

describe('AltaProveedoresComponent', () => {
  let component: AltaProveedoresComponent;
  let fixture: ComponentFixture<AltaProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AltaProveedoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AltaProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
