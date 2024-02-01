import { ProductoBack } from "./productoBack.model";
import { ProveedorBack } from "./proveedorBack.model";

export interface DetalleOrdenBack{
    id?: number;
   /*  orden_de_compra: OrdenBack; */
    producto: ProductoBack;
    cantidad_producto?:number;
    precio_hist?: number;
    total?: number

}
export interface OrdenBack {
    id?:number;
    estadoOrden:{
        id?:number,
        nombre_estado?: string,
    };
    proveedor: ProveedorBack;
    numero_orden?:number;
    fecha_emision?: Date;
    fecha_entrega_esperada?:Date;
    informacion_orden?:string;
    eliminada?:boolean;
    detalles: DetalleOrdenBack []

}