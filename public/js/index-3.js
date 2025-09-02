const nombreProfesorSpan = document.getElementById("nombreProfesor");
const listaTiquetes = document.getElementById("listaTiquetes");
const listaProfesores = document.getElementById("lista-profesores");
const formAgregar = document.getElementById("form-agregar-profesor");

import { obtenerTickets } from "../services/funcion.js";

const nombreProfesor = localStorage.getItem("usuarioLogeado");
const rolUsuario = localStorage.getItem("rolUsuario");

if (!nombreProfesor || rolUsuario !== "profesor") {
  alert("Debes iniciar sesión como profesor");
  window.location.href = "index1.html";
}
nombreProfesorSpan.textContent = nombreProfesor;


function mostrarTiquetes() {
  obtenerTickets().then(function (data) {
    listaTiquetes.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
      var li = document.createElement("li");

      li.innerHTML = `
        <strong>${data[i].alumno}</strong>: ${data[i].consulta} 
        (Hora: ${data[i].hora}) <br>
        <strong>Respuestas:</strong>
        <ul>
          ${(data[i].respuestas || []).map(r => `<li>${r}</li>`).join("")}
        </ul>
        <input type="text" id="respuesta-${data[i].id}" placeholder="Escribir respuesta">
        <button onclick="responderTicket('${data[i].id}')">Responder</button>
      `;

      listaTiquetes.appendChild(li);
    }
  });
}

mostrarTiquetes();


function mostrarProfesores() {
  fetch("http://localhost:3001/usuarios")
    .then(res => res.json())
    .then(data => {
      listaProfesores.innerHTML = "";
      data.filter(u => u.rol === "profesor" || u.rol === "administrador")
        .forEach(u => {
          const li = document.createElement("li");
          li.textContent = u.nombre + " (" + u.rol + ")";
          listaProfesores.appendChild(li);
        });
    });
}

mostrarProfesores();


formAgregar.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre-profesor").value.trim();
  const password = document.getElementById("password-profesor").value.trim();
  const rol = document.getElementById("rol-profesor").value;

  if (nombre && password && rol) {
    fetch("http://localhost:3001/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, password, rol })
    })
      .then(res => res.json())
      .then(() => {
        mostrarProfesores();
        formAgregar.reset();
      });
  }
});


window.responderTicket = function (id) {
  const input = document.getElementById(`respuesta-${id}`);
  const respuesta = input.value.trim();

  if (!respuesta) {
    alert("Escribe una respuesta antes de enviar");
    return;
  }


  fetch(`http://localhost:3001/tickets/${id}`)
    .then(res => res.json())
    .then(ticket => {
      const nuevasRespuestas = ticket.respuestas || [];
      nuevasRespuestas.push(respuesta);

      return fetch(`http://localhost:3001/tickets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ respuestas: nuevasRespuestas })
      });
    })
    .then(() => {
      input.value = "";
      mostrarTiquetes();
    });
};


document.getElementById("btnLogout").addEventListener("click", function () {
  localStorage.removeItem("usuarioLogeado");
  localStorage.removeItem("rolUsuario");
  window.location.href = "index1.html";
});
