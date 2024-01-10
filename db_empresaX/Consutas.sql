-- Consultas a la BD


-- Obtener todos los productos, mostrando nombre del producto, categoría, proveedor (razón social y codigo proveedor), precio.

SELECT
    P.nombre_producto AS NombreProducto,
    C.nombre_categoria AS Categoria,
    PR.razon_social AS Proveedor,
    PR.codigo_proveedor AS CodigoProveedor,
    P.precio_producto AS PrecioARS
FROM Productos P
JOIN Categorias C ON P.id_categoria = C.id_categoria
JOIN Proveedores PR ON P.id_proveedor = PR.id_proveedor;

-- En el listado anterior, además de los datos mostrados, traer el campo imagen aunque el producto NO tenga una. Sino tiene imagen, mostrar "-".
SELECT
    P.nombre_producto AS NombreProducto,
    C.nombre_categoria AS Categoria,
    PR.razon_social AS Proveedor,
    PR.codigo_proveedor AS CodigoProveedor,
    P.precio_producto AS Precio,
    CASE WHEN P.url_img LIKE '' THEN '-' ELSE P.url_img END AS Imagen
FROM Productos P
JOIN Categorias C ON P.id_categoria = C.id_categoria
JOIN Proveedores PR ON P.id_proveedor = PR.id_proveedor;


-- Mostrar los datos que se pueden modificar (en el front) del producto con ID = 2.

SELECT
    P.id_producto,
    P.nombre_producto AS NombreProducto,
    P.descripcion,
    P.url_img,
    P.precio_producto
FROM Productos P
WHERE P.id_producto = 2;


-- Listar todo los proveedores cuyo teléfono tenga la característica de Córdoba o que la provincia sea igual a alguna de las 3 con más proveedores.

SELECT *
FROM DatosDeContacto DC
WHERE DC.telefono_contacto LIKE '351%';


-- Segunda opcion..

SELECT TOP 3
    P.id_proveedor,
    P.codigo_proveedor,
    P.razon_social,
    P.id_provincia,
    PR.nombre_provincia AS ProvinciaNombre
FROM Proveedores P
JOIN Provincias PR ON P.id_provincia = PR.id_provincia
WHERE P.id_provincia IN (
    SELECT TOP 3 id_provincia
    FROM Proveedores
    GROUP BY id_provincia
    ORDER BY COUNT(*) DESC
);


-- Traer un listado de todos los proveedores que no hayan sido eliminados , y ordenados por razon social, codigo proveedor y fecha en que se dió de alta ASC.
-- De este listado mostrar los datos que correspondan con su tabla del front.

SELECT
    P.razon_social 'Razon Social',
    CONCAT(DC.nombre_contacto, ' ', DC.apellido_contacto) AS NombreCompleto,
    R.nombre_rubro 'Rubro',
    P.cuit_proveedor 'CUIT',
    CONCAT(DC.email_contacto, ' ', DC.telefono_contacto) AS Contacto,
	P.created_at
FROM Proveedores P
JOIN DatosDeContacto DC ON P.id_proveedor = DC.id_proveedor
JOIN Rubros R ON R.id_rubro_proveedor = P.id_rubro_proveedor
ORDER BY
    P.razon_social ASC,
    P.codigo_proveedor ASC,
    P.created_at ASC;



-- Obtener razon social, codigo proveedor, imagen, web, email, teléfono y los datos del contacto del proveedor con más ordenes de compra cargadas.

SELECT TOP 1
    P.razon_social AS RazonSocial,
    P.codigo_proveedor AS CodigoProveedor,
    P.img AS Img,
    P.web AS Web,
    DC.email_contacto AS EmailContacto,
    DC.telefono_contacto AS TelefonoContacto,
    DC.nombre_contacto AS NombreContacto,
    DC.apellido_contacto AS ApellidoContacto
FROM Proveedores P
JOIN DatosDeContacto DC ON P.id_proveedor = DC.id_proveedor
LEFT JOIN DetallesOrdenes DO ON P.id_proveedor = DO.id_proveedor
GROUP BY
    P.id_proveedor,
    P.razon_social,
    P.codigo_proveedor,
    P.img,
    P.web,
    DC.email_contacto,
    DC.telefono_contacto,
    DC.nombre_contacto,
    DC.apellido_contacto
HAVING COUNT(id_orden) = (
    SELECT TOP 1 COUNT(id_orden) AS TotalOrdenes
    FROM DetallesOrdenes DO, Proveedores P
    WHERE DO.id_proveedor = P.id_proveedor
    GROUP BY DO.id_proveedor
    ORDER BY TotalOrdenes DESC
);


-- Mostrar la fecha emisión, nº de orden, razon social y codigo de proveedor, y la cantidad de productos de cada orden.

SELECT
    O.fecha_emision AS FechaEmision,
    O.numero_orden AS NumeroOrden,
    P.razon_social AS RazonSocial,
    P.codigo_proveedor AS CodigoProveedor,
    SUM(DetallesOrdenes.cantidad_producto) AS CantidadProductos
FROM DetallesOrdenes
JOIN Proveedores P ON DetallesOrdenes.id_proveedor = P.id_proveedor
JOIN OrdenesDeCompra O ON O.id_orden = DetallesOrdenes.id_orden
GROUP BY
    O.fecha_emision,
    O.numero_orden,
    P.razon_social,
    P.codigo_proveedor
ORDER BY O.fecha_emision DESC, O.numero_orden;


-- En el listado anterior, diferenciar cuando una orden está Cancelada o no, y el total de la misma.

SELECT
    OC.fecha_emision,
    OC.numero_orden,
    P.razon_social,
    P.codigo_proveedor,
    COUNT(DO.id_producto) AS CantidadProductos,
    E.nombre_estado AS EstadoOrden,
    SUM(DO.total) AS TotalOrden
FROM OrdenesDeCompra OC
JOIN DetallesOrdenes DO ON OC.id_orden = DO.id_orden
JOIN Proveedores P ON DO.id_proveedor = P.id_proveedor
JOIN EstadosOrden E ON OC.id_estado = E.id_estado_orden
GROUP BY OC.fecha_emision, OC.numero_orden, P.razon_social, P.codigo_proveedor, E.nombre_estado
ORDER BY OC.fecha_emision;


-- Mostrar el detalle de una orden de compra del proveedor 3, trayendo: SKU del producto, nombre producto, cantidad y subtotal.

SELECT
    P.codigo_sku AS SKU,
    P.nombre_producto AS NombreProducto,
    DO.cantidad_producto AS Cantidad,
    DO.total AS Subtotal
FROM OrdenesDeCompra OC
JOIN DetallesOrdenes DO ON OC.id_orden = DO.id_orden
JOIN Productos P ON DO.id_producto = P.id_producto
WHERE DO.id_proveedor = 3;


-- Cambiar el estado a Cancelada y la fecha de modificación a la orden de compra con ID = 4.

UPDATE OrdenesDeCompra
SET
    id_estado = (SELECT id_estado_orden FROM EstadosOrden WHERE nombre_estado = 'Cancelada'),
    updated_at = GETDATE()
WHERE id_orden = 4;

-- Escribir la sentencia para eliminar el producto con id = 1 (NO EJECUTAR, SÓLO MOSTRAR SENTENCIA)
-- DELETE FROM Productos WHERE id_producto = 1;
