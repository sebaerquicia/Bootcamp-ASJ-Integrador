export interface FormularioProveedor {
    id: number | undefined;
    nombre: string;
    razonSocial: string;
    rubro: string;
    cuit: number | undefined;
    iva: string;
    calle:string;
    cp: number| undefined;
    localidad: string;
    provincia: string;
    pais: string;
    email: string;
    telefono: number| undefined;
  }
