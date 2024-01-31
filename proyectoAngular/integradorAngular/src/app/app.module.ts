import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyHeaderComponent } from './components/my-header/my-header.component';
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


@NgModule({
  declarations: [
    AppComponent,
    MyHeaderComponent,
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
    FilterByPipe
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
