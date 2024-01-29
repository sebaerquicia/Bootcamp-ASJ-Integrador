export interface Orden {
    nro: number | undefined;
    fecha:string;
    fechaEntrega: string;
    informacion: string;
    proveedor: string;
    productos: ProductoOrden[];
    total:number;
  }
export interface ProductoOrden{
  nombre: string;
  cantidad: number;
  precio: number;
}