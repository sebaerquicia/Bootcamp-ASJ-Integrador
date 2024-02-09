--CREATE DATABASE EmpresaX1

CREATE TABLE "Categorias"(
    "id" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "nombre_categoria" VARCHAR(50) NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME,
    "eliminada" BIT NULL
);

CREATE TABLE "EstadosOrden"(
    "id" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "nombre_estado" VARCHAR(50) NOT NULL
);

CREATE TABLE "CondicionesIva"(
    "id" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "nombre_iva" VARCHAR(50) NOT NULL
);

CREATE TABLE "Rubros"(
    "id" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "nombre_rubro" VARCHAR(50) NOT NULL
);

CREATE TABLE "Paises"(
    "id" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "nombre_pais" VARCHAR(50) NOT NULL
);

CREATE TABLE "Provincias"(
    "id" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "nombre_provincia" VARCHAR(50) NOT NULL,
    "pais_id" INT NOT NULL,
	FOREIGN KEY("pais_id") REFERENCES "Paises"("id")
);

CREATE TABLE "Proveedores"(
    "id" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "datos_contacto_id" INT NOT NULL,
    "codigo_proveedor" VARCHAR(50) NOT NULL,
    "razon_social" VARCHAR(50) NOT NULL,
    "rubro_proveedor_id" INT NOT NULL,
    "provincia_id" INT NOT NULL,
    "localidad" VARCHAR(50) NOT NULL,
    "codigo_postal" INT NOT NULL,
    "calle" VARCHAR(50) NOT NULL,
    "numero_calle" INT NOT NULL,
    "cuit_proveedor" VARCHAR(11) NOT NULL,
    "iva_id" INT NOT NULL,
	"web" NVARCHAR(MAX) NULL,
	"img" NVARCHAR(MAX) NULL,
    "eliminado" BIT NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME,
    FOREIGN KEY ("datos_contacto_id") REFERENCES "DatosDeContacto" ("id"),
	FOREIGN KEY("provincia_id") REFERENCES "Provincias"("id"),
	FOREIGN KEY("iva_id") REFERENCES "CondicionesIva"("id")
	FOREIGN KEY("rubro_proveedor_id") REFERENCES "Rubros"("id")


);

CREATE TABLE "DatosDeContacto"(
    "id" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "proveedor_id" INT NOT NULL,
    "nombre_contacto" VARCHAR(50) NOT NULL,
    "apellido_contacto" VARCHAR(50) NOT NULL,
    "telefono_contacto" VARCHAR(50) NOT NULL,
    "email_contacto" VARCHAR(50) NOT NULL,
    "rol" VARCHAR(50) NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME,
	FOREIGN KEY("proveedor_id") REFERENCES "Proveedores"("id"),
);

CREATE TABLE "Productos"(
    "id" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "proveedor_id" INT NOT NULL,
    "categoria_id" INT NOT NULL,
    "codigo_sku" VARCHAR(50) NOT NULL,
    "nombre_producto" VARCHAR(50) NOT NULL,
    "descripcion" TEXT NULL,
    "url_img" TEXT NULL,
    "precio_producto" FLOAT NOT NULL,
    "eliminado" BIT NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME,
	FOREIGN KEY("proveedor_id") REFERENCES "Proveedores"("id"),
	FOREIGN KEY("categoria_id") REFERENCES "Categorias"("id")

);
CREATE TABLE "OrdenesDeCompra"(
    "id" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "estado_id" INT NOT NULL,
    "proveedor_id" INT NOT NULL,
    "numero_orden" INT NOT NULL,
    "fecha_emision" DATE NOT NULL,
    "fecha_entrega_esperada" DATE NOT NULL,
     "informacion_orden" TEXT NULL,
    "eliminada" BIT NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL,
    FOREIGN KEY("proveedor_id") REFERENCES "Proveedores"("id"),
	FOREIGN KEY("estado_id") REFERENCES "EstadosOrden"("id"),

);

CREATE TABLE "DetallesOrden"(
    "id" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
	"orden_id" INT NOT NULL,  
    "producto_id" INT NOT NULL,
    "cantidad_producto" INT NOT NULL,
    "precio_hist" FLOAT NOT NULL,
    "total" FLOAT NOT NULL,
	FOREIGN KEY("producto_id") REFERENCES "Productos"("id"),
	FOREIGN KEY("orden_id") REFERENCES "OrdenesDeCompra"("id")
);
