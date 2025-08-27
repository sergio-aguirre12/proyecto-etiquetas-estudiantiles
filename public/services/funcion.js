
export function obtenerUsuarios() {
  return fetch("http://localhost:3001/usuarios")
    .then(function (respuesta) { return respuesta.json(); })
    .catch(function (error) {

      console.log("Error al conectar con el servidor:", error);
      return [];
    });
}



export function obtenerTickets() {

  return fetch("http://localhost:3001/tickets")

    .then(function (respuesta) {
      return respuesta.json();
    })

    .catch(function (error) {
      console.log("No se pudo conectar al servidor:", error);
      return [];
    });
}

export function crearTicket(ticket) {

  return fetch("http://localhost:3001/tickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ticket)
  })

    .then(function (respuesta) {
      return respuesta.json();
    });
}
