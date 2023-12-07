/*!
 * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     document.body.classList.toggle('sb-sidenav-toggled');
    // }
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem(
        "sb|sidebar-toggle",
        document.body.classList.contains("sb-sidenav-toggled")
      );
    });
  }
});


// Hardcodeo en el LS los proveedores

const proveedores = [
  {
    nombre: "pepito",
    codigo: 1,
    razonsocial: "SRL",
    rubro: "galletitas",
    contacto: [
      {
        email: "pepito@gmail.com",
        telefono: 3415668997,
      },
    ],
    direccion: [
      {
        calle: "Hola",
        cp: 2000,
        localidad: "Rosario",
        provincia: "Santa Fe",
        pais: "Argentina",
      },
    ],
    datosFiscales: [{ cuit: 20111111118, iva: "exento" }],

  },
  {
    nombre: "pepito2",
    codigo: 2,
    razonsocial: "SRL",
    rubro: "galletitas",
    contacto: [
      {
        email: "pepito@gmail.com",
        telefono: 3415668997,
      },
    ],
    direccion: [
      {
        calle: "Hola",
        cp: 2000,
        localidad: "Rosario",
        provincia: "Santa Fe",
        pais: "Argentina",
      },
    ],
    datosFiscales: [{ cuit: 20111111118, iva: "exento" }],
    
  },
  {
    nombre: "pepito3",
    codigo: 3,
    razonsocial: "SRL",
    rubro: "galletitas",
    contacto: [
      {
        email: "pepito@gmail.com",
        telefono: 3415668997,
      },
    ],
    direccion: [
      {
        calle: "Hola",
        cp: 2000,
        localidad: "Rosario",
        provincia: "Santa Fe",
        pais: "Argentina",
      },
    ],
    datosFiscales: [{ cuit: 20111111118, iva: "exento" }],
    
  },
];


function renderizarProveedores(proveedores){
    let tabla = document.getElementById("datatablesSimple");
  /*   tabla.innerHTML = "" */
    proveedores.forEach((proveedor) => {
      let fila = document.createElement("tr");
      fila.innerHTML = `
      <th>Proveedor</th>
      <th>Codigo/SKU</th>
      <th>Categoría</th>
      <th>Producto</th>
      <th>Descripción</th>
      <th>Precio</th>`
      tabla.appendChild(fila);
    })

}