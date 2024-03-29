-- Categorias de productos
INSERT INTO "Categorias" ("nombre_categoria", "updated_at", "created_at")
VALUES
    ('Electronicos', GETDATE(), GETDATE()),
    ('Ropa', GETDATE(), GETDATE()),
    ('Hogar', GETDATE(), GETDATE()),
    ('Juguetes', GETDATE(), GETDATE()),
    ('Deportes', GETDATE(), GETDATE()),
    ('Libros', GETDATE(), GETDATE()),
    ('Alimentos', GETDATE(), GETDATE()),
    ('Belleza', GETDATE(), GETDATE());
--SQL CATEGORIAS
INSERT INTO categorias (nombre_categoria, updated_at, created_at, eliminada)
VALUES
    ('Electronicos', GETDATE(), GETDATE(), 0),
    ('Ropa', GETDATE(), GETDATE(), 0),
    ('Hogar', GETDATE(), GETDATE(), 0),
    ('Juguetes', GETDATE(), GETDATE(), 0),
    ('Deportes', GETDATE(), GETDATE(), 0),
    ('Libros', GETDATE(), GETDATE(), 0),
    ('Alimentos', GETDATE(), GETDATE(), 0),
    ('Belleza', GETDATE(), GETDATE(), 0);

-- Estados de ordenes de compra
INSERT INTO "EstadosOrden" ("nombre_estado")
VALUES
    ('En Proceso'),
    ('Aprobada'),
    ('En Camino'),
    ('Entregada'),
    ('Cancelada');


--SQL ESTADOSORDEN
INSERT INTO estadosorden (nombre_estado)
VALUES
    ('En Proceso'),
    ('Aprobada'),
    ('En Camino'),
    ('Entregada'),
    ('Cancelada');

-- Condiciones frente al IVA
INSERT INTO "CondicionesIva" ("nombre_iva")
VALUES
    ('Responsable Inscripto'),
    ('Monotributista'),
    ('Exento'),
    ('No Responsable'),
    ('Consumidor Final');

--SQL CONDICIONESIVA
INSERT INTO condicionesiva (nombre_iva)
VALUES
    ('Responsable Inscripto'),
    ('Monotributista'),
    ('Exento'),
    ('No Responsable'),
    ('Consumidor Final');

-- Rubros de los proveedores
INSERT INTO "Rubros" ("nombre_rubro")
VALUES
    ('Electronicos'),
    ('Ropa'),
    ('Hogar'),
    ('Juguetes'),
    ('Deportes'),
    ('Libros'),
    ('Alimentos'),
    ('Belleza');


--SQL RUBROS
INSERT INTO rubros (nombre_rubro)
VALUES
    ('Electronicos'),
    ('Ropa'),
    ('Hogar'),
    ('Juguetes'),
    ('Deportes'),
    ('Libros'),
    ('Alimentos'),
    ('Belleza');


-- Paises latinoamericanos de los que pueden ser mis proveedores
INSERT INTO "Paises" ("nombre_pais")
VALUES
    ('Argentina'),
    ('Brasil'),
    ('Mexico'),
    ('Chile'),
    ('Colombia');

-- Provincias de cada Pais

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

-- Datos de Proveedores
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
    ('PROVMCD1', 1, 7, 'MC Donalds', 3, 'Rosario', 2000, 'Caferatta', 1234, 21345678907, 3,'www.mcdonalds.com', 'imagenronald.img', GETDATE(), GETDATE(), 0),
    ('PROVPOP1', 2, 2, 'Popeye', 3, 'Rosario', 2000, 'Avellaneda', 1368, 22456789017, 2,'www.popeye.com', NULL, GETDATE(), GETDATE(), 0),
    ('PROVMAC1', 3, 8, 'MAC', 1, 'San Isidro', 1642, 'Pellegrini', 789, 20567890128, 1, 'www.mac.com', 'lapizlabial.img', GETDATE(), GETDATE(), 0),
    ('PROVFRAV1', 4, 1, 'Fravega', 3, 'Rosario', 2000, 'San Martin', 1011, 20678901238, 1, 'www.fravega.com.ar', NULL, GETDATE(), GETDATE(), 0),
    ('PROVYENN1',5 , 6, 'Yenny', 16, 'Cerrillos', 4407, 'Las Aves', 6582, 20789012347, 4, NULL, NULL, GETDATE(), GETDATE(), 0),
    ('PROVMOST1',6 , 7, 'Mostaza', 2, 'Capital', 5000, 'Las Heras', 1415, 20890123458, 1, 'www.mostaza.com.ar', 'hamburguesaza.jpg', GETDATE(), GETDATE(), 0),
    ('PROVNIKE1', 7, 5, 'Nike', 2, 'Capital', 5000, 'San Juan', 1617, 20901234567, 3, 'www.nike.com', 'nikepipe.img', GETDATE(), GETDATE(), 0),
    ('PROVSP78',8 , 2, 'Sport 78', 3, 'Rosario', 2000, 'Rioja', 1819, 21012345678, 3, 'www.sport78.com', 'sport.jpeg', GETDATE(), GETDATE(), 0),
    ('PROVMEGA1',9 , 3, 'Megatone', 1, 'Capital', 1000, 'San Luis', 2021, 20123456788, 4, 'www.megatone.com.ar', NULL, GETDATE(), GETDATE(), 0),
    ('PROVAPPLE1', 10, 1, 'Apple', 1, 'La Plata',1000, 'Calle 74', 2100, 20345608908, 4, 'www.apple.com', 'iphone.img', GETDATE(), GETDATE(), 0);
	


/* INSERT INTO Proveedores (
    codigo_proveedor,
    datos_contacto_id,
    rubro_proveedor_id,
    razon_social,
    provincia_id,
    localidad,
    codigo_postal,
    calle,
    numero_calle,
    cuit_proveedor,
    iva_id,
	web,
	img
)
VALUES
    ('PROVMCD1', 22, 7, 'MC Donalds', 3, 'Rosario', 2000, 'Caferatta', 1234, 21345678907, 3,'www.mcdonalds.com', 'imagenronald.img'),
    ('PROVPOP1', 23, 2, 'Popeye', 3, 'Rosario', 2000, 'Avellaneda', 1368, 22456789017, 2,'www.popeye.com', NULL),
    ('PROVMAC1', 24, 8, 'MAC', 1, 'San Isidro', 1642, 'Pellegrini', 789, 20567890128, 1, 'www.mac.com', 'lapizlabial.img'),
    ('PROVFRAV1', 25, 1, 'Fravega', 3, 'Rosario', 2000, 'San Martin', 1011, 20678901238, 1, 'www.fravega.com.ar', NULL),
    ('PROVYENN1', 26, 6, 'Yenny', 16, 'Cerrillos', 4407, 'Las Aves', 6582, 20789012347, 4, NULL, NULL),
    ('PROVMOST1', 27, 7, 'Mostaza', 2, 'Capital', 5000, 'Las Heras', 1415, 20890123458, 1, 'www.mostaza.com.ar', 'hamburguesaza.jpg'),
    ('PROVNIKE1', 28, 5, 'Nike', 2, 'Capital', 5000, 'San Juan', 1617, 20901234567, 3, 'www.nike.com', 'nikepipe.img'),
    ('PROVSP78', 29, 2, 'Sport 78', 3, 'Rosario', 2000, 'Rioja', 1819, 21012345678, 3, 'www.sport78.com', 'sport.jpeg'),
    ('PROVMEGA1', 30, 3, 'Megatone', 1, 'Capital', 1000, 'San Luis', 2021, 20123456788, 4, 'www.megatone.com.ar', NULL),
    ('PROVAPPLE1', 31, 1, 'Apple', 1, 'La Plata',1000, 'Calle 74', 2100, 20345608908, 4, 'www.apple.com', 'iphone.img');
 */

-- Datos de contacto para cada proveedor
INSERT INTO "DatosDeContacto" (
    "rol",
    "nombre_contacto",
    "apellido_contacto",
    "telefono_contacto",
    "email_contacto"
)
VALUES
    ('Vendedor', 'Juan', 'Perez', 123456789, 'juan.perez@gmail.com'),
    ('Vendedor', 'Ana', 'Gomez', 987654321, 'ana.gomez@hotmail.com'),
    ('Vendedor', 'Carlos', 'Rodriguez', 456789012, 'carlos.rodriguez@gmail.com'),
    ('Vendedor', 'Luisa', 'Martinez', 789012345, 'luisa.martinez@gmail.com'),
    ('Vendedor', 'Pedro', 'Fernandez', 234567890, 'pedro.fernandez@hotmail.com'),
    ('Vendedor', 'Maria', 'Lopez', 351678901, 'maria.lopez@gmail.com'),
    ('Vendedor', 'Martin', 'Sanchez', 3516789013, 'martin.sanchez@gmail.com'),
    ('Vendedor', 'Sofia', 'Diaz', 678901234, 'sofia.diaz@hotmail.com'),
    ('Vendedor', 'Eduardo', 'Ramirez', 890123456, 'eduardo.ramirez@hotmail.com'),
    ('Vendedor', 'Laura', 'Gutierrez', 901234567, 'laura.gutierrez@hotmail.com');

/* INSERT INTO DatosDeContacto (
    rol,
    nombre_contacto,
    apellido_contacto,
    telefono_contacto,
    email_contacto
)
VALUES
    ('Vendedor', 'Juan', 'Perez', 123456789, 'juan.perez@gmail.com'),
    ('Vendedor', 'Ana', 'Gomez', 987654321, 'ana.gomez@hotmail.com'),
    ('Vendedor', 'Carlos', 'Rodriguez', 456789012, 'carlos.rodriguez@gmail.com'),
    ('Vendedor', 'Luisa', 'Martinez', 789012345, 'luisa.martinez@gmail.com'),
    ('Vendedor', 'Pedro', 'Fernandez', 234567890, 'pedro.fernandez@hotmail.com'),
    ('Vendedor', 'Maria', 'Lopez', 351678901, 'maria.lopez@gmail.com'),
    ('Vendedor', 'Martin', 'Sanchez', 3516789013, 'martin.sanchez@gmail.com'),
    ('Vendedor', 'Sofia', 'Diaz', 678901234, 'sofia.diaz@hotmail.com'),
    ('Vendedor', 'Eduardo', 'Ramirez', 890123456, 'eduardo.ramirez@hotmail.com'),
    ('Vendedor', 'Laura', 'Gutiirrez', 901234567, 'laura.gutierrez@hotmail.com');
 */


-- Productos por proveedor

INSERT INTO "Productos" (
    "proveedor_id",
    "categoria_id",
    "codigo_sku",
    "nombre_producto",
    "descripcion",
    "url_img",
    "precio_producto",
    "updated_at",
    "created_at"
)
VALUES
    -- Productos para el Proveedor MC Donalds
    (1, 7, 'SKU001', 'Hamburguesa Completa', 'Con cheddar y panceta', 'url_imagen1.jpg', 6000, GETDATE(), GETDATE()),
    (1, 7, 'SKU002', 'Cajita Feliz', 'Para niños, trae juguete', 'url_imagen2.jpg', 6500, GETDATE(), GETDATE()),

    -- Productos para el Proveedor Popeye
    (2, 2, 'SKU003', 'Iron Man', 'Figura de accion coleccionable, mide 50 cm', 'url_imagen3.jpg', 25000, GETDATE(), GETDATE()),
    (2, 2, 'SKU004', 'Blade Blade', 'Trompo de metal re copado', 'url_imagen4.jpg', 10000, GETDATE(), GETDATE()),
	 -- Productos para el Proveedor MAC
    (3, 8, 'SKU005', 'Lapiz Labial Mate', 'Lapiz labial color mate color 56', 'url_imagen1.jpg', 12000, GETDATE(), GETDATE()),
    (3, 8, 'SKU006', 'Rubor', 'Rubor color 55', 'url_imagen2.jpg', 8700, GETDATE(), GETDATE()),

    -- Productos para el Proveedor Fravega
    (4, 1, 'SKU007', 'Heladera Samsung', 'Heladera de 354l, dos puertas no frost', 'url_imagen3.jpg', 850000, GETDATE(), GETDATE()),
    (4, 1, 'SKU008', 'Lavarropas Ariston', 'Lavarropas importado marca ariston, carga frontal 7l', 'url_imagen4.jpg', 740000, GETDATE(), GETDATE()),
	 -- Productos para el Proveedor Yenny Chile
    (5, 6, 'SKU009', 'Programacion 1', 'Fundamentos de programacion, para principiantes', '', 12000, GETDATE(), GETDATE()),
    (5, 6, 'SKU010', 'Java, How To', 'Como manejar Java com un pro', '', 11000, GETDATE(), GETDATE()),

    -- Productos para el Proveedor Mostaza
    (6, 7, 'SKU011', 'Papas Grandes', 'Papas tama�o xl', '', 3500, GETDATE(), GETDATE()),
    (6, 7, 'SKU012', 'Hamburguesa Dibu', 'Dibu completa con lechuga, cheddar, tomate y cebolla', 'url_mega.jpg', 7500, GETDATE(), GETDATE()),
	 -- Productos para el Proveedor Nike
    (7, 5, 'SKU013', 'Pelota de futbol', 'PElota mundial 2022', 'url_imagen11.jpg', 35000, GETDATE(), GETDATE()),
    (7, 2, 'SKU014', 'Calza Slim Fit', 'Calsa de mujer talle M', '', 30000, GETDATE(), GETDATE()),

    -- Productos para el Proveedor Sport 78
    (8, 2, 'SKU015', 'Camiseta Rosario Central', 'Ultima camiseta del CARC', 'url_imagenCarc.jpg', 40000, GETDATE(), GETDATE()),
    (8, 5, 'SKU016', 'Raqueta Babolat', 'Ultima raqueta Babolat', '', 250000, GETDATE(), GETDATE()),
	 -- Productos para el Proveedor Megatone
    (9, 3, 'SKU017', 'Heladera Ariston 2 puertas', 'Heladera de alta calidad alemana, 450l', 'url_imagenAriston.jpg', 1200000, GETDATE(), GETDATE()),
    (9, 1, 'SKU018', 'Samsung Galaxy A32', 'Celular gama media, 3gb ram, 12 mpx camara frontal', 'url_imagenGalaxy.jpg', 330000, GETDATE(), GETDATE()),

    -- Productos para el Proveedor Apple
    (10, 1, 'SKU019', 'MacBook Air m2 13 pulgadas', '8GB ram, 256 SSD', 'url_imagenApple.jpg', 1230000, GETDATE(), GETDATE()),
    (10, 1, 'SKU020', 'Iphone 14', 'Iphone 14 2022, 4gb ram', '', 860000, GETDATE(), GETDATE());


INSERT INTO Productos (
    proveedor_id,
    categoria_id,
    codigo_sku,
    nombre_producto,
    descripcion,
    url_img,
    precio_producto
)
VALUES

    (12, 15, 'SKU001', 'Hamburguesa Completa', 'Con cheddar y panceta', 'url_imagen1.jpg', 6000),
    (12, 15, 'SKU002', 'Cajita Feliz', 'Para ni�os, trae juguete', 'url_imagen2.jpg', 6500),


    (13, 12, 'SKU003', 'Iron Man', 'Figura de accion coleccionable, mide 50 cm', 'url_imagen3.jpg', 25000),
    (13, 12, 'SKU004', 'Blade Blade', 'Trompo de metal re copado', 'url_imagen4.jpg', 10000),

    (14, 16, 'SKU005', 'Lapiz Labial Mate', 'Lapiz labial color mate color 56', 'url_imagen1.jpg', 12000),
    (14, 16, 'SKU006', 'Rubor', 'Rubor color 55', 'url_imagen2.jpg', 8700),


    (15, 9, 'SKU007', 'Heladera Samsung', 'Heladera de 354l, dos puertas no frost', 'url_imagen3.jpg', 850000),
    (15, 9, 'SKU008', 'Lavarropas Ariston', 'Lavarropas importado marca ariston, carga frontal 7l', 'url_imagen4.jpg', 740000),

    (16, 14, 'SKU009', 'Programacion 1', 'Fundamentos de programacion, para principiantes', '', 12000),
    (16, 14, 'SKU010', 'Java, How To', 'Como manejar Java com un pro', '', 11000),


    (17, 15, 'SKU011', 'Papas Grandes', 'Papas tama�o xl', '', 3500),
    (17, 15, 'SKU012', 'Hamburguesa Dibu', 'Dibu completa con lechuga, cheddar, tomate y cebolla', 'url_mega.jpg', 7500),

    (18, 13, 'SKU013', 'Pelota de futbol', 'PElota mundial 2022', 'url_imagen11.jpg', 35000),
    (18, 10, 'SKU014', 'Calza Slim Fit', 'Calsa de mujer talle M', '', 30000),


    (19, 10, 'SKU015', 'Camiseta Rosario Central', 'Ultima camiseta del CARC', 'url_imagenCarc.jpg', 40000),
    (19, 13, 'SKU016', 'Raqueta Babolat', 'Ultima raqueta Babolat', '', 250000),

    (20, 11, 'SKU017', 'Heladera Ariston 2 puertas', 'Heladera de alta calidad alemana, 450l', 'url_imagenAriston.jpg', 1200000),
    (20, 9, 'SKU018', 'Samsung Galaxy A32', 'Celular gama media, 3gb ram, 12 mpx camara frontal', 'url_imagenGalaxy.jpg', 330000),

    (21, 9, 'SKU019', 'MacBook Air m2 13 pulgadas', '8GB ram, 256 SSD', 'url_imagenApple.jpg', 1230000),
    (21, 9, 'SKU020', 'Iphone 14', 'Iphone 14 2022, 4gb ram', '', 860000);






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
    (5, 1005, 5, '2023-12-30', '2024-01-05', NULL, 1);




-- Detalles de ordenes de compra

INSERT INTO DetallesOrden (
	orden_id,
    producto_id,
    cantidad_producto,
    precio_hist,
    total
)
VALUES
    (1, 2, 10, 6000, 60000),
	(1, 3, 1, 6500, 6500),
    (2, 6, 5, 12000, 60000),
    (3, 20, 1, 1230000, 1230000),
    (4, 11, 12, 11000, 132000),
    (5, 19, 5, 330000, 1650000);
