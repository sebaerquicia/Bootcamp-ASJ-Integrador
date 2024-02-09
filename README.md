
# Proyecto Integrador Final

Desarrollo de un *Sistema de Gestión Compras* para manejar información de Proveedores, Productos y Órdenes de compra.


## Ejecutar localmente

Pasos necesarios para correr el proyecto localmente


- El Front del proyecto de encuentra en /proyectoAngular/integradorAngular.
- El Back del proyecto de encuentra en /proyectoAngular/integradorBack.
- En SQL Server crear una Base de Datos llamada IntegradorBootcamp.
- Correr el servidor de la base de datos en Eclipse. (Recuerda hacer el Maven Install del pom).
- Levantar el servidor de Angular (ng s -o).
- Usuario: "admin", Contrasenia: "admin".
- Ya se pueden cargar datos desde el front!


- Crear una base de datos llamada
```sql
  CREATE DATABASE IntegradorBootcamp;
```

- Crear la(s) siguiente(s) tabla(s)

```sql

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
    "nombre_contacto" VARCHAR(50) NOT NULL,
    "apellido_contacto" VARCHAR(50) NOT NULL,
    "telefono_contacto" VARCHAR(50) NOT NULL,
    "email_contacto" VARCHAR(50) NOT NULL,
    "rol" VARCHAR(50) NULL,
    "updated_at" DATETIME,
    "created_at" DATETIME,
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

```

- Inserts


```sql

-- Categorias
INSERT INTO "Categorias" ("nombre_categoria", "updated_at", "created_at", "eliminada")
VALUES
    ('Electronicos', GETDATE(), GETDATE(), 0),
    ('Ropa', GETDATE(), GETDATE(), 0),
    ('Hogar', GETDATE(), GETDATE(), 0),
    ('Juguetes', GETDATE(), GETDATE(), 0),
    ('Deportes', GETDATE(), GETDATE(), 0),
    ('Libros', GETDATE(), GETDATE(), 0),
    ('Alimentos', GETDATE(), GETDATE(), 0),
    ('Belleza', GETDATE(), GETDATE(), 0);



--Estados Orden
INSERT INTO "EstadosOrden" ("nombre_estado")
VALUES
    ('En Proceso'),
    ('Aprobada'),
    ('En Camino'),
    ('Entregada'),
    ('Cancelada');



-- Condiciones de IVA
INSERT INTO "CondicionesIva" ("nombre_iva")
VALUES
    ('Responsable Inscripto'),
    ('Monotributista'),
    ('Exento'),
    ('No Responsable'),
    ('Consumidor Final');


-- Rubros
INSERT INTO "Rubros" ("nombre_rubro")
VALUES
    ('Electronicos'),
    ('Ropa'),
    ('Hogar'),
    ('Juguetes'),
    ('Deportes'),
    ('Libros'),
    ('Alimentos'),
    ('Belleza'),
    ('Otros');


-- Paises latinoamericanos de los que pueden ser mis proveedores
INSERT INTO "Paises" ("nombre_pais")
VALUES
    ('Argentina'),
    ('Brasil'),
    ('Mexico'),
    ('Chile'),
    ('Colombia');

-- Provincias de cada Pais
-- Provincias de Argentina
INSERT INTO "Provincias" ("nombre_provincia", "pais_id")
VALUES
    ('Buenos Aires', 1),
    ('Cordoba', 1),
    ('Santa Fe', 1),
    ('Mendoza', 1),
    ('Tucuman', 1);

-- Provincias de Brasil
INSERT INTO "Provincias" ("nombre_provincia", "pais_id")
VALUES
    ('Sao Paulo', 2),
    ('Rio de Janeiro', 2),
    ('Minas Gerais', 2),
    ('Bahia', 2),
    ('Rio Grande do Sul', 2);



-- Provincias de Mexico
INSERT INTO "Provincias" ("nombre_provincia", "pais_id")
VALUES
    ('Ciudad de Mexico', 3),
    ('Estado de Mexico', 3),
    ('Jalisco', 3),
    ('Nuevo Leon', 3),
    ('Puebla', 3);


-- Provincias de Chile
INSERT INTO "Provincias" ("nombre_provincia", "pais_id")
VALUES
    ('Santiago', 4),
    ('Valparaiso', 4),
    ('Biobao', 4),
    ('La Araucania', 4),
    ('Coquimbo', 4);

-- Provincias de Colombia
INSERT INTO "Provincias" ("nombre_provincia", "pais_id")
VALUES
    ('Bogota', 5),
    ('Antioquia', 5),
    ('Valle del Cauca', 5),
    ('Cundinamarca', 5),
    ('Atlantico', 5);


-- Datos de contacto
INSERT INTO "DatosDeContacto" (
    "rol",
    "nombre_contacto",
    "apellido_contacto",
    "telefono_contacto",
    "email_contacto"
)
VALUES
    ('Vendedor', 'Juan', 'Perez', 123456789, 'juan.perez@gmail.com'),
    ('Gerente', 'Ana', 'Gomez', 987654321, 'ana.gomez@hotmail.com'),
    ('Vendedor', 'Carlos', 'Rodriguez', 456789012, 'carlos.rodriguez@gmail.com'),
    ('Vendedor', 'Luisa', 'Martinez', 789012345, 'luisa.martinez@gmail.com'),
    ('Administrador', 'Pedro', 'Fernandez', 234567890, 'pedro.fernandez@hotmail.com'),
    ('Vendedor', 'Maria', 'Lopez', 351678901, 'maria.lopez@gmail.com'),
    ('Vendedor', 'Martin', 'Sanchez', 3516789013, 'martin.sanchez@gmail.com'),
    ('Vendedor', 'Sofia', 'Diaz', 678901234, 'sofia.diaz@hotmail.com'),
    ('Jefe', 'Eduardo', 'Ramirez', 890123456, 'eduardo.ramirez@hotmail.com'),
    ('Vendedor', 'Laura', 'Gutierrez', 901234567, 'laura.gutierrez@hotmail.com');


-- Datos de proveedores
INSERT INTO "Proveedores" (
    "codigo_proveedor",
    "datos_contacto_id",
    "rubro_proveedor_id",
    "razon_social",
    "provincia_id",
    "localidad",
    "codigo_postal",
    "calle",
    "numero_calle",
    "cuit_proveedor",
    "iva_id",
	"web",
	"img",
    "updated_at",
    "created_at",
    "eliminado"
)
VALUES
    ('PROVMCD1', 1, 7, 'MC Donalds', 3, 'Rosario', 2000, 'Caferatta', 1234, 21345678907, 3,'https://www.mcdonalds.com', 'https://pbs.twimg.com/profile_images/1604944600321368064/FrLrbKGB_400x400.jpg', GETDATE(), GETDATE(), 0),
    ('PROVPOP1', 2, 2, 'Popeye', 3, 'Rosario', 2000, 'Avellaneda', 1368, 22456789017, 2,'https://static.abc.es/media/cultura/2019/01/17/35465187-kJGI--1248x698@abc.jpg', NULL, GETDATE(), GETDATE(), 0),
    ('PROVMAC1', 3, 8, 'MAC', 1, 'San Isidro', 1642, 'Pellegrini', 789, 20567890128, 1, 'https://www.mac.com', 'https://static.beautytocare.com/cdn-cgi/image/width=1600,height=1600,f=auto/media/catalog/product//m/-/m-a-c-cosmetics-matte-lipstick-606-kinda-sexy-3g_2.jpg', GETDATE(), GETDATE(), 0),
    ('PROVFRAV1', 4, 1, 'Fravega', 3, 'Rosario', 2000, 'San Martin', 1011, 20678901238, 1, 'https://www.fravega.com.ar', NULL, GETDATE(), GETDATE(), 0),
    ('PROVYENN1',5 , 6, 'Yenny', 16, 'Cerrillos', 4407, 'Las Aves', 6582, 20789012347, 4, NULL, NULL, GETDATE(), GETDATE(), 0),
    ('PROVMOST1',6 , 7, 'Mostaza', 2, 'Capital', 5000, 'Las Heras', 1415, 20890123458, 1, 'https://www.mostaza.com.ar', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPUPuEjfpPoD_l48bGboU0qbV4Nomd2ucEnA&usqp=CAU', GETDATE(), GETDATE(), 0),
    ('PROVNIKE1', 7, 5, 'Nike', 2, 'Capital', 5000, 'San Juan', 1617, 20901234567, 3, 'https://www.nike.com', 'https://thumbs.dreamstime.com/b/ilustraci%C3%B3n-vectorial-del-logotipo-nike-en-fondo-blanco-editorial-de-aislada-192037117.jpg', GETDATE(), GETDATE(), 0),
    ('PROVSP78',8 , 2, 'Sport 78', 3, 'Rosario', 2000, 'Rioja', 1819, 21012345678, 3, 'https://www.sport78.com', 'sport.jpeg', GETDATE(), GETDATE(), 0),
    ('PROVMEGA1',9 , 3, 'Megatone', 1, 'Capital', 1000, 'San Luis', 2021, 20123456788, 4, 'https://www.megatone.com.ar', NULL, GETDATE(), GETDATE(), 0),
    ('PROVAPPLE1', 10, 1, 'Apple', 1, 'La Plata',1000, 'Calle 74', 2100, 20345608908, 4, 'https://www.apple.com', 'https://infonegocios.info/content/images/2022/07/20/21392/conversions/apple-logo-top-100-brands-01-cba-medium-size.jpg', GETDATE(), GETDATE(), 0);


-- Productos
INSERT INTO "Productos" (
    "proveedor_id",
    "categoria_id",
    "codigo_sku",
    "nombre_producto",
    "descripcion",
    "url_img",
    "precio_producto",
    "updated_at",
    "created_at",
    "eliminado"
)
VALUES
    -- Productos para el Proveedor MC Donalds
    (1, 7, 'SKU001', 'Hamburguesa Completa', 'Con cheddar y panceta', 'https://pronacatqma.com/images/com_yoorecipe/banner_superior/18096_1.jpg', 6000, GETDATE(), GETDATE(), 0),
    (1, 7, 'SKU002', 'Cajita Feliz', 'Para niños, trae juguete', 'https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kaXT6bJZ/200/200/original?country=ar', 6500, GETDATE(), GETDATE(), 0),

    -- Productos para el Proveedor Popeye
    (2, 2, 'SKU003', 'Iron Man', 'Figura de accion coleccionable, mide 50 cm', 'https://d28hi93gr697ol.cloudfront.net/b8c2e4b8-9af7-7284-9b21-3641cfc56928/img/Producto/ceb21fee-c519-1f02-717b-9189947b78f4/Marvel-iron-man-62a207b6852c6.jpg', 25000, GETDATE(), GETDATE(), 0),
    (2, 2, 'SKU004', 'Blade Blade', 'Trompo de metal re copado', 'url_imagen4.jpg', 10000, GETDATE(), GETDATE(), 0),
	 -- Productos para el Proveedor MAC
    (3, 8, 'SKU005', 'Lapiz Labial Mate', 'Lapiz labial color mate color 56', 'https://dorothygray.com.ar/uploads/imagenes/7794740062840-01_396620489.jpg', 12000, GETDATE(), GETDATE(), 0),
    (3, 8, 'SKU006', 'Rubor', 'Rubor color 55', 'https://getthelookar.vtexassets.com/arquivos/ids/158473-800-auto?v=637245563445800000&width=800&height=auto&aspect=true', 8700, GETDATE(), GETDATE(), 0),

    -- Productos para el Proveedor Fravega
    (4, 1, 'SKU007', 'Heladera Samsung', 'Heladera de 354l, dos puertas no frost', 'https://images.start.com.ar/RT32K5930SL-2.jpg', 850000, GETDATE(), GETDATE(), 0),
    (4, 1, 'SKU008', 'Lavarropas Ariston', 'Lavarropas importado marca ariston, carga frontal 7l', 'https://lh3.googleusercontent.com/proxy/8N_Mda5J-G6448Z4H1ozE4fn-kcDoyBBBJKVY0YjjIpTeyyLOtFtrGIMqMxZ48OhsadvJCTTnKEBi4AzP9iY8sFs3ZyaL0s_HR2w7fRTB7laidA44fdmYusc8bzP202BCNXy0mB1Puk', 740000, GETDATE(), GETDATE(), 0),
	 -- Productos para el Proveedor Yenny Chile
    (5, 6, 'SKU009', 'Programacion 1', 'Fundamentos de programacion, para principiantes', '', 12000, GETDATE(), GETDATE(), 0),
    (5, 6, 'SKU010', 'Java, How To', 'Como manejar Java com un pro', '', 11000, GETDATE(), GETDATE(), 0),

    -- Productos para el Proveedor Mostaza
    (6, 7, 'SKU011', 'Papas Grandes', 'Papas tamaño xl', '', 3500, GETDATE(), GETDATE(), 0),
    (6, 7, 'SKU012', 'Hamburguesa Dibu', 'Dibu completa con lechuga, cheddar, tomate y cebolla', 'url_mega.jpg', 7500, GETDATE(), GETDATE(), 0),
	 -- Productos para el Proveedor Nike
    (7, 5, 'SKU013', 'Pelota de futbol', 'PElota mundial 2022', 'url_imagen11.jpg', 35000, GETDATE(), GETDATE(), 0),
    (7, 2, 'SKU014', 'Calza Slim Fit', 'Calsa de mujer talle M', '', 30000, GETDATE(), GETDATE(), 0),

    -- Productos para el Proveedor Sport 78
    (8, 2, 'SKU015', 'Camiseta Rosario Central', 'Ultima camiseta del CARC', 'url_imagenCarc.jpg', 40000, GETDATE(), GETDATE(), 0),
    (8, 5, 'SKU016', 'Raqueta Babolat', 'Ultima raqueta Babolat', '', 250000, GETDATE(), GETDATE(), 0),
	 -- Productos para el Proveedor Megatone
    (9, 3, 'SKU017', 'Heladera Ariston 2 puertas', 'Heladera de alta calidad alemana, 450l', 'url_imagenAriston.jpg', 1200000, GETDATE(), GETDATE(), 0),
    (9, 1, 'SKU018', 'Samsung Galaxy A32', 'Celular gama media, 3gb ram, 12 mpx camara frontal', 'url_imagenGalaxy.jpg', 330000, GETDATE(), GETDATE(), 0),

    -- Productos para el Proveedor Apple
    (10, 1, 'SKU019', 'MacBook Air m2 13 pulgadas', '8GB ram, 256 SSD', 'https://http2.mlstatic.com/D_NQ_NP_674451-MLA69550481714_052023-O.webp', 1230000, GETDATE(), GETDATE(), 0),
    (10, 1, 'SKU020', 'Iphone 14', 'Iphone 14 2022, 4gb ram', 'https://tienda.personal.com.ar/images/720/webp/i_Phone_14_Purple_856c41edf8.png', 860000, GETDATE(), GETDATE(), 0);


-- Ordenes de compra

INSERT INTO OrdenesDeCompra (
    estado_id,
    numero_orden,
    proveedor_id,
    fecha_emision,
    fecha_entrega_esperada,
    informacion_orden,
    eliminada
)
VALUES
    (3, 1001, 1, '2024-01-10', '2024-01-25', 'Traer lo antes posible', 0),
    (2, 1002, 2, '2024-01-09', '2024-02-01', 'Entregar en recepcion', 0),
    (4, 1003, 3, '2023-03-05', '2023-03-15', 'Tocar timbre', 0),
    (4, 1004, 4, '2023-04-20', '2023-04-30', NULL, 0),
    (5, 1005, 4, '2023-12-30', '2024-01-05', NULL, 0);


-- Detalles de ordenes de compra

INSERT INTO DetallesOrden (
	orden_id,
    producto_id,
    cantidad_producto,
    precio_hist,
    total
)
VALUES
    (1, 1, 10, 6000, 60000),
	  (1, 2, 1, 6500, 6500),
    (2, 9, 5, 12000, 60000),
    (3, 19, 1, 1230000, 1230000),
    (4, 10, 12, 11000, 132000),
    (5, 18, 5, 330000, 1650000);




```

- Ejecutar el servidor de Angular (*puerto 4200*)

```bash
  ng start -o
```

- Ejecutar el servidor de Java (*puerto 8080*)

- Insertar algunas **Categorías** desde el FRONT

- Insertar algunas **Proveedores** desde el FRONT

- Insertar algunas **Productos** desde el FRONT

- Insertar algunas **Ordenes de Compra** desde el FRONT




## Desarrollado por

Este proyecto fue desarrollado por: **Sebastian Erquicia**

