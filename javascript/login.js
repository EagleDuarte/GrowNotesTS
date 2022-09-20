"use strict";
btnLogin.addEventListener("click", entrar);
document.getElementById("btn-cadastrar").addEventListener("click", realizarCadastro);
// btnAdd.addEventListener("click", realizarCadastro);
function entrar() {
    if (!email.value || !senha1.value) {
        return alert("Os campos não foram preenchidos corretamente!");
    }
    const usuario = listaDeUsuarios.find((usuario) => usuario.email === email.value && usuario.senha === senha1.value);
    if (!usuario) {
        return alert("Usuário não localizado!");
    }
    else {
        const usuarioLogado = JSON.stringify(usuario);
        localStorage.setItem("usuarioLogado", usuarioLogado);
    }
    abrirListaDeRecados();
}
function abrirListaDeRecados() {
    window.location.href = "notes.html";
}
function realizarCadastro() {
    console.log(`Realizar cadastro`);
    window.location.href = "signup.html";
    document.getElementById("btn-entrar").addEventListener("click", entrar);
    document.getElementById("btn-cadastrar").addEventListener("click", realizarCadastro);
    let listaDeUsuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    function entrar() {
        if (!email.value || !senha1.value) {
            alert("Os campos não foram preenchidos corretamente!");
            return;
        }
        const usuario = listaDeUsuarios.find((usuario) => usuario.email === email.value && usuario.senha === senha1.value);
        if (!usuario) {
            alert("Usuário não localizado!");
            return;
        }
        abrirListaDeRecados();
    }
    function abrirListaDeRecados() {
        window.location.href = "notes.html";
    }
    function realizarCadastro() {
        window.location.href = "signup.html";
    }
}
