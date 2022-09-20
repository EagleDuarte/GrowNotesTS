let listaDeUsuarios = JSON.parse(localStorage.getItem("usuarios") || "[]") as User[];

let email = document.getElementById("email") as HTMLInputElement;
let senha1 = document.getElementById("senha1") as HTMLInputElement;
let senha2 = document.getElementById("senha2") as HTMLInputElement;

let btnSair = document.getElementById("sair") as HTMLButtonElement;
let btnSave = document.getElementById("salvar") as HTMLButtonElement;
let addNote = document.getElementById("adicionarRecado") as HTMLButtonElement;
let btnCloseModal = document.getElementById("modalClose") as HTMLButtonElement;
let noteInputList = document.querySelector("#tabelaRecados>tbody") as HTMLElement;


let btnCancel = document.getElementById("cancelar") as HTMLButtonElement;
let btnLogin = document.getElementById("btn-entrar") as HTMLButtonElement;
let btnAdd = document.getElementById("btn-cadastrar") as HTMLButtonElement;
let btnCreate = document.getElementById("btn-criar") as HTMLButtonElement;

