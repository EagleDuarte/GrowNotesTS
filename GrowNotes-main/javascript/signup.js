document.getElementById("btn-criar").addEventListener("click", validarUsuario);

let listaDeUsuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

let email = document.getElementById("email");
let senha1 = document.getElementById("senha1");
let senha2 = document.getElementById("senha2");

function registrarUsuario() {
  const usuario = {
    email: email.value,
    senha: senha1.value,
  };

  listaDeUsuarios.push(usuario);

  salvarListaUsuariosNoCache();
}

function redirecionarUsuario() {
  window.location.href = "login.html";
}

function salvarListaUsuariosNoCache() {
  const novosUsuarios = JSON.stringify(listaDeUsuarios);

  localStorage.setItem("usuarios", novosUsuarios);

  redirecionarUsuario();
}

function validarUsuario() {
  if (!email.value || !senha1.value) {
    alert("Campos Vazios!");
    return;
  }

  if (senha1.value !== senha2.value) {
    alert("As senhas não coincidem!");
    return;
  }

  verificarUsuario();

  registrarUsuario();
}

function verificarUsuario() {
  const resultado = listaDeUsuarios.find(
    (usuario) => usuario.email == email.value
  );

  if (resultado) {
    alert("Usuário já existente!");
  }
}
