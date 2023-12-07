/* //traigo desde un JSON file los datos
fetch("./info.json")
  .then((respuesta) => respuesta.json())
  .then((productos) => principal(productos))
  .catch((error) => alert("Error al cargar"));

  function principal(productos) {
    renderizarProductos(productos);
  }
  
  //funcion para renderizar los productos
  function renderizarProductos(productos) {
    let contenedor = document.getElementById("contenedorProductos");
    contenedor.innerHTML = "";
    productos.forEach((producto) => {
      let tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta";
      tarjeta.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img class= "imagenProducto" src =./img/${producto.rutaImagen} />
      <p>Precio: $${producto.precio}</p>
      <p>Stock disponible: ${producto.stock}</p> 
      <button class="button1" id=${producto.id}>Agregar al carrito</button>`;
      contenedor.appendChild(tarjeta);
      let botonAgregarAlCarrito = document.getElementById(producto.id);
      botonAgregarAlCarrito.addEventListener("click", (e) =>
        agregarProductoAlCarrito(productos, e)
      );
    });
  }
  
 */