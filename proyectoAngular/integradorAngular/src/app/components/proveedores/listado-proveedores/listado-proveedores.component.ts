import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicioProveedoresService } from '../../../services/servicio-proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioProveedor } from '../../../models/proveedor.model';




@Component({
  selector: 'app-listado-proveedores',
  templateUrl: './listado-proveedores.component.html',
  styleUrl: './listado-proveedores.component.css'
})
export class ListadoProveedoresComponent implements OnInit{


proveedores: any[]=[]


constructor (private proveedoresService: ServicioProveedoresService, private router: Router, private route: ActivatedRoute,  private cdr: ChangeDetectorRef){}


ngOnInit(): void {

 this.actualizarLista();
}

private actualizarLista() : void{
  this.proveedoresService.getProveedores().subscribe(data => {
    this.proveedores = data;
    console.log(this.proveedores)
  })
  this.cdr.detectChanges();
}

eliminarProveedor(index: number): void {
  alert('Se eliminará el proveedor')
  this.proveedoresService.eliminarProveedor(index);
  this.actualizarLista();
  //Elimino el proveedor con el index desde el servicio
}
editarProveedor(index: number, proveedor: FormularioProveedor): void {
  this.proveedoresService.modoEdicion = true;
  this.proveedoresService.proveedorEnEdicion = proveedor;
  this.proveedoresService.actualizarProveedor(index, proveedor);
  this.actualizarLista();
  this.router.navigate(['proveedores/alta-proveedores', { editarIndex: index }]);
 
}

}
