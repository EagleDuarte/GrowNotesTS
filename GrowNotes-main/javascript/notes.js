document.getElementById("sair").addEventListener("click", sair);

document.getElementById("adicionarRecado").addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

document.getElementById("salvar").addEventListener("click", salvarRecado);

document
  .querySelector("#tabelaRecados>tbody")
  .addEventListener("click", editDelete);

document.getElementById("cancelar").addEventListener("click", closeModal);

function openModal() {
  return document.getElementById("modal").classList.add("active");
}

function closeModal() {
  clearFields();
  document.getElementById("modal").classList.remove("active");
}

function getLocalStorage(usuario) {
  return JSON.parse(localStorage.getItem(usuario.email) || "[]");
}

function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
}

function setLocalStorage(dbUsuario, usuario) {
  return localStorage.setItem(usuario.email, JSON.stringify(dbUsuario));
}

function deletarRecado(index, usuario) {
  const dbUsuario = lerRecado(usuario);
  dbUsuario.splice(index, 1);
  setLocalStorage(dbUsuario, usuario);
}

function atualizarRecado(index, nota) {
  const usuario = getUserFromLocalStorage();
  const dbUsuario = lerRecado(usuario);

  dbUsuario[index] = nota;
  console.log(index, nota, dbUsuario);

  setLocalStorage(dbUsuario, usuario);
}

function lerRecado(usuario) {
  return getLocalStorage(usuario);
}

function criarRecado(nota) {
  const usuario = getUserFromLocalStorage();
  const dbUsuario = getLocalStorage(usuario);

  dbUsuario.push(nota);

  setLocalStorage(dbUsuario, usuario);
}

function isValidFields() {
  return document.getElementById("form").reportValidity();
}

function clearFields() {
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((field) => (field.value = ""));
  document.getElementById("descricao").dataset.index = "new";
}

function salvarRecado() {
  if (isValidFields()) {
    const nota = {
      descricao: document.getElementById("descricao").value,
      detalhamento: document.getElementById("detalhamento").value,
    };

    const index = document.getElementById("descricao").dataset.index;

    if (index == "new") {
      criarRecado(nota);
      atualizarTabela();
      closeModal();
    } else {
      atualizarRecado(index, nota);
      atualizarTabela();
      closeModal();
    }
  }
}

function createRow(usuario, index) {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${usuario.descricao}</td>
        <td>${usuario.detalhamento}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `;
  document.querySelector("#tabelaRecados>tbody").appendChild(newRow);
}

function clearTable() {
  const rows = document.querySelectorAll("#tabelaRecados>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
}

function atualizarTabela() {
  const usuario = getUserFromLocalStorage();
  const dbUsuario = lerRecado(usuario);

  clearTable();

  dbUsuario.forEach(createRow);
}

function fillFields(usuario, index) {
  document.getElementById("descricao").value = usuario.descricao;
  document.getElementById("descricao").dataset.index = usuario.index;
  document.getElementById("detalhamento").value = usuario.detalhamento;

  document.getElementById("descricao").dataset.index = index;
}

function editarRecado(index) {
  const usuario = getUserFromLocalStorage();
  const notaAlvo = lerRecado(usuario)[index];

  fillFields(notaAlvo, index);

  openModal();
}

function editDelete(event) {
  if (event.target.type == "button") {
    const [action, index] = event.target.id.split("-");
    const usuario = getUserFromLocalStorage();

    if (action == "edit") {
      editarRecado(index);
    } else {
      const nota = lerRecado(usuario)[index];

      const response = confirm(
        `Deseja realmente excluir o recado ${nota.descricao}?`
      );

      if (response) {
        deletarRecado(index, usuario);
        atualizarTabela();
      }
    }
  }
}

function sair() {
  localStorage.setItem("usuarioLogado", "");
  window.location.href = "login.html";
}

if (!localStorage.getItem("usuarioLogado")) sair();

atualizarTabela();
