const nombreAlumnoSpan = document.getElementById("nombreAlumno");
const formTiquete = document.getElementById("form-tiquete");
const consultaInput = document.getElementById("consulta");
const listaTiquetes = document.getElementById("listaTiquetes");

import { obtenerTickets, crearTicket } from "../services/funcion.js";

const nombreAlumno = localStorage.getItem("usuarioLogeado");
const rolUsuario = localStorage.getItem("rolUsuario");

if (!nombreAlumno || rolUsuario !== "alumno") {
  window.location.href = "pages/index1.html";
}
nombreAlumnoSpan.textContent = nombreAlumno;

function mostrarTiquetes() {
  obtenerTickets().then(data => {
    listaTiquetes.innerHTML = "";
    data
      .filter(ticket => ticket.alumno === nombreAlumno)
      .forEach(ticket => {
        const li = document.createElement("li");
        li.textContent = `${ticket.consulta} (Hora: ${ticket.hora})`;
        listaTiquetes.appendChild(li);
      });
  });
}
mostrarTiquetes();


formTiquete.addEventListener("submit", function (e) {
  e.preventDefault();

  const consulta = consultaInput.value.trim();
  if (consulta === "") return;

  const hora = new Date().toLocaleString();
  const nuevoTiquete = { alumno: nombreAlumno, consulta: consulta, hora: hora };

  crearTicket(nuevoTiquete).then(function () {
    consultaInput.value = "";
    mostrarTiquetes();
  });
});
