"use strict";
let listaDeUsuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
let email = document.getElementById("email");
let senha1 = document.getElementById("senha1");
let senha2 = document.getElementById("senha2");
let btnSair = document.getElementById("sair");
let btnSave = document.getElementById("salvar");
let addNote = document.getElementById("adicionarRecado");
let btnCloseModal = document.getElementById("modalClose");
let noteInputList = document.querySelector("#tabelaRecados>tbody");
let btnCancel = document.getElementById("cancelar");
let btnLogin = document.getElementById("btn-entrar");
let btnAdd = document.getElementById("btn-cadastrar");
let btnCreate = document.getElementById("btn-criar");