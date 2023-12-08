const form = document.getElementById("formRegister");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const razonInput = document.getElementById("razonInput");
const rubroInput = document.getElementById("rubroInput");
const cuitInput = document.getElementById("cuitInput");


const tableBody= document.getElementById("tableBody")

let data = JSON.parse(localStorage.getItem("formData")) || [];

form.addEventListener("submit", (e) => {
  const name = nameInput.value;
  const email = emailInput.value;
  const rubro = rubroInput.value;
  const cuit = cuitInput.value;
  const razon = razonInput.value;

  if (name && email && rubro && cuit && razon) {
    const newData = { name, rubro, razon, cuit, email };
    data.push(newData);
    saveDataToLocalStorage();
    renderTable();
    form.reset();
  } else{
    alert("Ingresa todos los campos")
  }
});

function saveDataToLocalStorage() {
  localStorage.setItem("formData", JSON.stringify(data));
}

function renderTable() {
  tableBody.innerHTML = "";

  data.forEach(function (proveedor, index) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const rubroCell = document.createElement("td");
    const razonCell = document.createElement("td");
    const cuitCell = document.createElement("td");
    const emailCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    nameCell.textContent = proveedor.name;
    rubroCell.textContent = proveedor.rubro;
    razonCell.textContent = proveedor.razon;
    cuitCell.textContent = proveedor.cuit;
    emailCell.textContent = proveedor.email;
    editButton.textContent = "Editar";
    deleteButton.textContent = "Eliminar";
    editButton.classList.add("btn", "btn-warning");
    deleteButton.classList.add("btn", "btn-danger");

    editButton.addEventListener("click", function () {
      editData(index);
    });
    deleteButton.addEventListener("click", function () {
        deleteData(index);
      });

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(rubroCell);
    row.appendChild(razonCell);
    row.appendChild(cuitCell);
    row.appendChild(emailCell);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
}

function editData(index) {
  const item = data[index];
  nameInput.value = item.name;
  rubroInput.value = item.rubro;
  razonInput.value = item.razon;
  cuitInput.value = item.cuit;
  emailInput.value = item.email;

  data.splice(index, 1);
  saveDataToLocalStorage();
  renderTable();
}

function deleteData(index){
    data.splice(index,1)
    saveDataToLocalStorage();
  renderTable();
}
renderTable();