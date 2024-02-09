import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyFooterComponent } from './components/my-footer/my-footer.component';
import { MySidebarComponent } from './components/my-sidebar/my-sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyNavbarComponent } from './components/my-navbar/my-navbar.component';
import { ListadoProveedoresComponent } from './components/proveedores/listado-proveedores/listado-proveedores.component';
import { AltaProveedoresComponent } from './components/proveedores/alta-proveedores/alta-proveedores.component';
import { ListadoProductosComponent } from './components/productos/listado-productos/listado-productos.component';
import { AltaProductosComponent } from './components/productos/alta-productos/alta-productos.component';
import { MyMainComponent } from './components/my-main/my-main.component';
import { AddOrdenComponent } from './components/orden-compra/add-orden/add-orden.component';
import { ListadoOrdenComponent } from './components/orden-compra/listado-orden/listado-orden.component';
import { FormsModule } from '@angular/forms';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { ModalComponent } from './components/proveedores/modal/modal.component';
import { ModalProductoComponent } from './components/productos/modal-producto/modal-producto.component';
import { ModalOrdenComponent } from './components/orden-compra/modal-orden/modal-orden.component';
import { AltaCategoriaComponent } from './components/productos/alta-categoria/alta-categoria.component';
import { LoginComponent } from './components/login/login.component';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MyFooterComponent,
    MySidebarComponent,
    MyNavbarComponent,
    ListadoProveedoresComponent,
    AltaProveedoresComponent,
    ListadoProductosComponent,
    AltaProductosComponent,
    MyMainComponent,
    AddOrdenComponent,
    ListadoOrdenComponent,
    FilterByPipe,
    ModalComponent,
    ModalProductoComponent,
    ModalOrdenComponent,
    AltaCategoriaComponent,
    LoginComponent,
    FilterByNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }