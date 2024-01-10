--CREATE DATABASE EmpresaX1

CREATE TABLE "Categorias"(
    "id_categoria" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "nombre_categoria" VARCHAR(50) NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL
);

CREATE TABLE "EstadosOrden"(
    "id_estado_orden" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "nombre_estado" VARCHAR(50) NOT NULL
);

CREATE TABLE "CondicionesIva"(
    "id_iva" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "nombre_iva" VARCHAR(50) NOT NULL
);

CREATE TABLE "Rubros"(
    "id_rubro_proveedor" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "nombre_rubro" VARCHAR(50) NOT NULL
);


CREATE TABLE "Roles"(
    "id_rol" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "nombre_rol" VARCHAR(50) NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL
);

CREATE TABLE "Paises"(
    "id_paises" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "nombre_pais" VARCHAR(50) NOT NULL
);

CREATE TABLE "Provincias"(
    "id_provincia" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "nombre_provincia" VARCHAR(50) NOT NULL,
    "id_pais" INT NOT NULL,
	FOREIGN KEY("id_pais") REFERENCES "Paises"("id_paises")
);

CREATE TABLE "Proveedores"(
    "id_proveedor" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "codigo_proveedor" VARCHAR(50) NOT NULL,
    "id_rubro_proveedor" INT NOT NULL,
    "razon_social" VARCHAR(50) NOT NULL,
    "id_provincia" INT NOT NULL,
    "localidad" VARCHAR(50) NOT NULL,
    "codigo_postal" INT NOT NULL,
    "calle" VARCHAR(50) NOT NULL,
    "numero_calle" INT NOT NULL,
    "cuit_proveedor" VARCHAR(11) NOT NULL,
    "id_iva" INT NOT NULL,
	"web" NVARCHAR(MAX) NULL,
	"img" NVARCHAR(MAX) NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL,
	FOREIGN KEY("id_provincia") REFERENCES "Provincias"("id_provincia"),
	FOREIGN KEY("id_iva") REFERENCES "CondicionesIva"("id_iva"),
	FOREIGN KEY("id_rubro_proveedor") REFERENCES "Rubros"("id_rubro_proveedor")
);

CREATE TABLE "DatosDeContacto"(
    "id_datos_contacto" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "id_proveedor" INT NOT NULL,
    "id_rol" INT NOT NULL,
    "nombre_contacto" VARCHAR(50) NOT NULL,
    "apellido_contacto" VARCHAR(50) NOT NULL,
    "telefono_contacto" INT NOT NULL,
    "email_contacto" VARCHAR(50) NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL,
	FOREIGN KEY("id_proveedor") REFERENCES "Proveedores"("id_proveedor"),
	FOREIGN KEY("id_rol") REFERENCES "Roles"("id_rol")
);

CREATE TABLE "Productos"(
    "id_producto" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "id_proveedor" INT NOT NULL,
    "id_categoria" INT NOT NULL,
    "codigo_sku" VARCHAR(50) NOT NULL,
    "nombre_producto" VARCHAR(50) NOT NULL,
    "descripcion" TEXT NULL,
    "url_img" TEXT NULL,
    "precio_producto" FLOAT NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL,
	FOREIGN KEY("id_proveedor") REFERENCES "Proveedores"("id_proveedor"),
	FOREIGN KEY("id_categoria") REFERENCES "Categorias"("id_categoria")

);
CREATE TABLE "OrdenesDeCompra"(
    "id_orden" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    "id_estado" INT NOT NULL,
    "numero_orden" INT NOT NULL,
    "fecha_emision" DATE NOT NULL,
    "fecha_entrega_esperada" DATE NOT NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME NOT NULL,
	FOREIGN KEY("id_estado") REFERENCES "EstadosOrden"("id_estado_orden"),

);

CREATE TABLE "DetallesOrdenes"(
    "id_detalle_orden" INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
	"id_orden" INT,
    "id_proveedor" INT NOT NULL,
    "id_producto" INT NOT NULL,
    "informacion_orden" TEXT NULL,
    "cantidad_producto" INT NOT NULL,
    "precio_hist" FLOAT NOT NULL,
    "total" FLOAT NOT NULL,
	FOREIGN KEY("id_proveedor") REFERENCES "Proveedores"("id_proveedor"),
	FOREIGN KEY("id_producto") REFERENCES "Productos"("id_producto"),
	FOREIGN KEY("id_orden") REFERENCES "OrdenesDeCompra"("id_orden")
);


ALTER TABLE "DatosDeContacto"
ALTER COLUMN "telefono_contacto" BIGINT;