import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';


@Injectable({
  providedIn: 'root',
})
export class ServicioProductosService {
  modoEdicion: boolean = false;
  productoEnEdicion: any;
  productos: Producto[]=[];

  private productosKey = 'productos';


 getProductos(): any[] {
    const productosString = localStorage.getItem(this.productosKey);
    this.productos = productosString ? JSON.parse(productosString) : [];
    return this.productos
  }
  guardarProducto(producto: any): void {
    const productos = this.getProductos();
    productos.push(producto);
    localStorage.setItem(this.productosKey, JSON.stringify(productos));
  }

  eliminarProducto(index: number): void {
    const productos = this.getProductos();
    if (this.productos.length > 0){
      productos.splice(index, 1);
      localStorage.setItem(this.productosKey, JSON.stringify(productos));
    }
  }
  actualizarProducto(index: number, producto: Producto): void {
    this.modoEdicion=true;
    const productos = this.getProductos()
    productos.splice(index, 1, producto);
    localStorage.setItem(this.productosKey, JSON.stringify(productos));
  }
  getNombresProveedores(): string[] {
    const proveedoresString = localStorage.getItem('proveedores');
    const proveedores = proveedoresString ? JSON.parse(proveedoresString) : [];
    
    if (!Array.isArray(proveedores)) {
      return [];
    }

    return proveedores.map(proveedor => proveedor.nombre || '');
  }

  getProductosPorProveedor(nombre: string): Producto[] {
    return this.productos.filter((producto) => producto.nombreProv === nombre);
  }
  
}
