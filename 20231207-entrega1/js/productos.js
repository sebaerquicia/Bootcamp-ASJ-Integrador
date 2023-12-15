const form = document.getElementById("formRegister");
const nameInput = document.getElementById("nameInput");
const codigoInput = document.getElementById("codigoInput");
const categoriaInput = document.getElementById("categoriaInput");
const nameProductInput = document.getElementById("nameProductInput");
const descriptionInput = document.getElementById("descriptionInput");
const precioInput = document.getElementById("precioInput")

const card = document.getElementById("productCards");

let data = JSON.parse(localStorage.getItem("productData")) || [];

form.addEventListener("submit", (e)=>{
    const nombre = nameInput.value;
    const codigo = codigoInput.value;
    const categoria = categoriaInput.value;
    const nameProduct = nameProductInput.value;
    const description = descriptionInput.value;
    const precio = precioInput.value;

    if(nombre && codigo && categoria && nameProduct && description && precio){
        const newData = {nombre, codigo, categoria, nameProduct, description, precio}
        data.push(newData)
        saveDataToLocalStorage()
        renderCard()
        form.reset()
    }else{
        alert("No ingresaste todos los campos")
    }
})

function saveDataToLocalStorage() {
    localStorage.setItem("productData", JSON.stringify(data));
  }

  function renderCard(){
    card.innerHTML=""

    data.forEach(function(producto, index){
        let cardContainer = document.createElement("div")
        cardContainer.classList.add("card-body")
/* 
        editButton.textContent = "Editar";
        deleteButton.textContent = "Eliminar";
        editButton.classList.add("btn", "btn-warning");
        deleteButton.classList.add("btn", "btn-danger");
 */
        cardContainer.innerHTML = `
        <h5 class="card-title">Proveedor: ${producto.nombre}</h5>
        <h6>Producto: ${producto.nameProduct}</h6>
        <hr>
        <h6 class="card-subtitle mb-2 text-muted">Código/SKU: ${producto.codigo}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Categoria: ${producto.categoria}</h6>
        <hr>
        <p class="card-text">Descripción: ${producto.description}</p>
        <hr>
        <h4>Precio: $${producto.precio}</h4>`

        /* creo los botones, les pongo clases, texto, les agrego un listener y los appendeo al div */
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        editButton.classList.add("btn", "btn-warning");
        deleteButton.classList.add("btn", "btn-danger");
        editButton.textContent = "Editar";
        deleteButton.textContent = "Eliminar"

        editButton.addEventListener("click", function () {
          editData(index);
        });
        deleteButton.addEventListener("click", function () {
            deleteData(index);
          });
         card.appendChild(cardContainer)
         cardContainer.appendChild(editButton)
         cardContainer.appendChild(deleteButton)

    });
  }
  function editData(index) {
    const item = data[index];
    nameInput.value = item.nombre;
    codigoInput.value = item.codigo;
    categoriaInput.value = item.categoria;
    nameProductInput.value = item.nameProduct;
    descriptionInput.value = item.description;
    precioInput.value= item.precio
  
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderCard();
  }
  
  function deleteData(index){
      data.splice(index,1)
      saveDataToLocalStorage();
    renderCard();
  }

  renderCard()