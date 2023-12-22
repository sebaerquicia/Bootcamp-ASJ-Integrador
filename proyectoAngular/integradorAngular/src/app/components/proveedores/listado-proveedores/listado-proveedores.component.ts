import { Component, OnInit } from '@angular/core';
import { ServicioProveedoresService } from '../../../services/servicio-proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioProveedor } from '../../../models/proveedor.model';




@Component({
  selector: 'app-listado-proveedores',
  templateUrl: './listado-proveedores.component.html',
  styleUrl: './listado-proveedores.component.css'
})
export class ListadoProveedoresComponent implements OnInit{


proveedores: FormularioProveedor[]=[]


constructor (private proveedoresService: ServicioProveedoresService, private router: Router, private route: ActivatedRoute){}


ngOnInit(): void {

 this.proveedores = this.proveedoresService.proveedores

 
}


eliminarProveedor(index: number): void {
  this.proveedoresService.eliminarProveedor(index);
  //Elimino el proveedor con el index desde el servicio
}
editarProveedor(index: number): void {
  this.router.navigate(['proveedores/alta-proveedores', { editarIndex: index }]);
 
}

}
