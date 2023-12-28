export interface Orden {
    nro: number | undefined;
    fecha:string;
    fechaEntrega: string;
    direccion: string;
    proveedor: string;
    productos: ProductoOrden[];
    total:number;
  }
export interface ProductoOrden{
  nombre: string;
  cantidad: number;
  precio:number;
}