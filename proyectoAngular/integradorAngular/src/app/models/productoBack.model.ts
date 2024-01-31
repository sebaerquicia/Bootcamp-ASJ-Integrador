import { ProveedorBack } from "./proveedorBack.model";
export interface ProductoBack {
    
        id?: number | null;
        proveedor: ProveedorBack;
        categoria: {
            id?: number,
            nombre_categoria?: string
        };
        codigo_sku: string;
        nombre_producto: string;
        descripcion?: string;
        url_img?: string;
        precio_producto?: number;
        eliminado?: boolean
    }
