export interface FormularioProveedor {
    id?: number | undefined;
    codigo_proveedor: string;
    razonSocial: string;
    rubro: string;
    cuit: number | undefined;
    iva: string;
    calle:string;
    nrocalle: number | undefined;
    web: string;
    cp: number| undefined;
    localidad: string;
    provincia: string;
    pais: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: number| undefined;
    rol: string;
  }
