import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {
  transform(productos: any[], searchTerm: string): any[] {
    if (!productos || !searchTerm) {
      return productos;
    }

    return productos.filter(producto =>
      producto.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
