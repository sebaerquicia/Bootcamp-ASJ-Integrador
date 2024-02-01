import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicioProveedoresService } from '../../../services/servicio-proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioProveedor } from '../../../models/proveedor.model';
import { ProveedorBack } from '../../../models/proveedorBack.model';
import { NgZone } from '@angular/core';



@Component({
  selector: 'app-listado-proveedores',
  templateUrl: './listado-proveedores.component.html',
  styleUrl: './listado-proveedores.component.css'
})
export class ListadoProveedoresComponent implements OnInit{

filtroRazonSocial: string = '';
proveedores: any[]=[]
filtroActivoEliminado: string = 'Todos';

constructor (private proveedoresService: ServicioProveedoresService, private router: Router, private zone: NgZone,  private cdr: ChangeDetectorRef){}


ngOnInit(): void {
 this.actualizarLista();
}

filtrarProveedores() {
  if (this.filtroActivoEliminado === 'Activos') {
    return this.proveedores.filter(proveedor => !proveedor.eliminado);
  } else if (this.filtroActivoEliminado === 'Eliminados') {
    return this.proveedores.filter(proveedor => proveedor.eliminado);
  } else {
    return this.proveedores; // Mostrar todos los proveedores
  }
}

private actualizarLista() : void{
  this.proveedoresService.getProveedores().subscribe(data => {
    this.proveedores = data;

  })
}

eliminarProveedor(id: number): void {
  alert('Se eliminará el proveedor')
  this.zone.run(() => {
  this.proveedoresService.eliminarProveedor(id).subscribe(msj=> {console.log(msj)
  this.actualizarLista();
  });
  })
}
editarProveedor(id:any): void {
this.router.navigate(['/proveedores/alta-proveedores/',{id}])
}


}
