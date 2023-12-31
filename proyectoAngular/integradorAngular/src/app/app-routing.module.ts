import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaProductosComponent } from './components/productos/alta-productos/alta-productos.component';
import { AltaProveedoresComponent } from './components/proveedores/alta-proveedores/alta-proveedores.component';
import { MyMainComponent } from './components/my-main/my-main.component';
import { AddOrdenComponent } from './components/orden-compra/add-orden/add-orden.component';
import { ListadoProductosComponent } from './components/productos/listado-productos/listado-productos.component';
import { ListadoProveedoresComponent } from './components/proveedores/listado-proveedores/listado-proveedores.component';
import { ListadoOrdenComponent } from './components/orden-compra/listado-orden/listado-orden.component';

const routes: Routes = [
  { path: 'productos/alta-productos', component: AltaProductosComponent },
  { path: 'proveedores/alta-proveedores', component: AltaProveedoresComponent },
  { path: 'orden-compra/add-orden', component: AddOrdenComponent },
  { path: 'productos/listado-productos', component: ListadoProductosComponent },
  { path: 'proveedores/listado-proveedores', component: ListadoProveedoresComponent },
  { path: 'orden-compra/listado-orden', component: ListadoOrdenComponent },
  
  { path: '', component: MyMainComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
