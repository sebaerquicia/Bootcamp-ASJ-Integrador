import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
  transform(proveedores: any[], filtroRazonSocial: string): any[] {
    if (!filtroRazonSocial || filtroRazonSocial.trim() === '') {
      return proveedores;
    }

    return proveedores.filter(proveedor =>
      proveedor.razon_social.toLowerCase().includes(filtroRazonSocial.toLowerCase())
    );
  }
}
