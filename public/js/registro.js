const formRegistro = document.getElementById("form-registro");
const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("correo");
const passwordInput = document.getElementById("password");
const gradoInput = document.getElementById("grado");

import { crearUsuario } from "../services/funcion.js";

formRegistro.addEventListener("submit", function(e) {
  e.preventDefault();

  const nuevoUsuario = {
    nombre: nombreInput.value.trim(),
    correo: correoInput.value.trim(),
    password: passwordInput.value.trim(),
    grado: gradoInput.value.trim(),
    rol: "alumno"
  };

  crearUsuario(nuevoUsuario).then(data => {
    alert("Registro exitoso, ahora puedes iniciar sesión");
    window.location.href = "index1.html"; 
  });
});
