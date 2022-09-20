interface User {
  email: string;
  senha: string;
}

interface Nota {
  descricao: string;
  detalhamento: string;
  index: any;
}

btnSair.addEventListener("click", sair);
addNote.addEventListener("click", openModal);
btnSave.addEventListener("click", salvarRecado);
btnCancel.addEventListener("click", closeModal);
btnCloseModal.addEventListener("click", closeModal);
noteInputList.addEventListener("click", editDelete);

function openModal() {
  return (document.getElementById("modal") as HTMLElement).classList.add(
    "active"
  );
}

function closeModal() {
  clearFields();
  (document.getElementById("modal") as HTMLElement).classList.remove("active");
}

function getLocalStorage(usuario: User) {
  return JSON.parse(localStorage.getItem(usuario.email) || "[]");
}

function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
}

function setLocalStorage(dbUsuario: User[], usuario: User) {
  return localStorage.setItem(usuario.email, JSON.stringify(dbUsuario));
}

function deletarRecado(index: any, usuario: User) {
  const dbUsuario = lerRecado(usuario);
  dbUsuario.splice(index, 1);
  setLocalStorage(dbUsuario, usuario);
}

function atualizarRecado(index: any, nota: Nota) {
  const usuario = getUserFromLocalStorage();
  const dbUsuario = lerRecado(usuario);

  dbUsuario[index] = nota;
  console.log(index, nota, dbUsuario);

  setLocalStorage(dbUsuario, usuario);
}

function lerRecado(usuario: User) {
  return getLocalStorage(usuario);
}

function criarRecado(nota: Nota) {
  const usuario = getUserFromLocalStorage();
  const dbUsuario = getLocalStorage(usuario);

  dbUsuario.push(nota);

  setLocalStorage(dbUsuario, usuario);
}

function isValidFields() {
  return (document.getElementById("form") as HTMLFormElement).reportValidity();
}

function clearFields() {
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((field) => ((field as HTMLInputElement).value = ""));
  (document.getElementById("descricao") as HTMLInputElement).dataset.index =
    "new";
}

function salvarRecado() {
  if (isValidFields()) {
    const index = (document.getElementById("descricao") as HTMLInputElement)
      .dataset.index;

    const nota: Nota = {
      descricao: (document.getElementById("descricao") as HTMLInputElement)
        .value,
      detalhamento: (
        document.getElementById("detalhamento") as HTMLInputElement
      ).value,
      index,
    };

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

function createRow(nota: Nota, index: any) {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${nota.descricao}</td>
        <td>${nota.detalhamento}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `;
  (document.querySelector("#tabelaRecados>tbody") as HTMLElement).appendChild(
    newRow
  );
}

function clearTable() {
  const rows = document.querySelectorAll("#tabelaRecados>tbody tr");
  rows.forEach((row) => (row.parentNode as HTMLInputElement).removeChild(row));
}

function atualizarTabela() {
  const usuario = getUserFromLocalStorage();
  const dbUsuario = lerRecado(usuario);

  clearTable();

  dbUsuario.forEach(createRow);
}

function fillFields(nota: Nota, index: any) {
  (document.getElementById("descricao") as HTMLInputElement).value =
    nota.descricao;

  (document.getElementById("descricao") as HTMLInputElement).dataset.index =
    nota.index;

  (document.getElementById("detalhamento") as HTMLInputElement).value =
    nota.detalhamento;

  (document.getElementById("descricao") as HTMLInputElement).dataset.index =
    index;
}

function editarRecado(index: any) {
  const usuario = getUserFromLocalStorage();
  const notaAlvo = lerRecado(usuario)[index];

  fillFields(notaAlvo, index);

  openModal();
}

function editDelete(event: any) {
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
