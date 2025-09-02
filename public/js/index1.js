
const formLogin = document.getElementById("form-login");
const nombreInput = document.getElementById("nombre");
const passwordInput = document.getElementById("password");
const mensaje = document.getElementById("mensaje");
const registrarBtn = document.getElementById("registrar");

import { obtenerUsuarios } from "../services/funcion.js";


formLogin.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const password = passwordInput.value.trim();

  obtenerUsuarios().then(data => {
    const usuarioEncontrado = data.find(u => u.nombre === nombre && u.password === password);

    if (!usuarioEncontrado) {
      mensaje.textContent = "Usuario o contraseña incorrectos";
      mensaje.style.color = "red";
      return;
    }


    localStorage.setItem("usuarioLogeado", usuarioEncontrado.nombre);
    localStorage.setItem("rolUsuario", usuarioEncontrado.rol);

    mensaje.style.color = "green";
    mensaje.textContent = "Bienvenido " + usuarioEncontrado.nombre;


    setTimeout(function () {
      if (usuarioEncontrado.rol === "alumno") {
        window.location.href = "../pages/index-2.html";
      } else {
        window.location.href = "../pages/index-3.html";
      }
    }, 1000);
  });
});


registrarBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "../pages/registro.html";
});
