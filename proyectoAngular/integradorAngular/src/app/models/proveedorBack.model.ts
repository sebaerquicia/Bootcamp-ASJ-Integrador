export interface ProveedorBack {
    id?: number ;
    codigo_proveedor: string;
    rubro_proveedor: {
        id: number | null,
        nombre_rubro?: string | null
    };
    razon_social: string;
    provincia: {
        id: number |null,
        nombre_provincia?: string | null,
        pais: {
            id: number | null,
            nombre_pais?: string | null
        }
    };
    localidad: string | null;
    codigo_postal: number | null;
    calle: string | null;
    numero_calle: number | null;
    cuit_proveedor: string;
    contacto: {
        id?: number | null,
        nombre_contacto: string,
        apellido_contacto: string,
        rol?: string | null,
        telefono_contacto?: string,
        email_contacto?: string,
    };
    iva: {
        id?: number | null,
        nombre_iva?: string
    };
    web?: string | null;
    img?: string | null;
    eliminado?: boolean

}