import { Component, OnInit } from '@angular/core';
import { ServicioProveedoresService } from '../../../services/servicio-proveedores.service';




@Component({
  selector: 'app-listado-proveedores',
  templateUrl: './listado-proveedores.component.html',
  styleUrl: './listado-proveedores.component.css'
})
export class ListadoProveedoresComponent implements OnInit{

  proveedores!: any[];


constructor (private proveedoresService: ServicioProveedoresService){}
ngOnInit(): void {
 this.proveedores = this.proveedoresService.obtenerProveedores()
 console.log(this.proveedores)
}

}
