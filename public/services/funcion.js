
//pide los usuarios echos de la funcion
export function obtenerUsuarios() {
  return fetch("http://localhost:3001/usuarios")
    .then(function (respuesta) { return respuesta.json(); })
    .catch(function (error) {

      console.log("Error al conectar con el servidor:", error);
      return [];
    });
}

//pide los tiketes echos de la funcion
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
//crear tickets y envia los nuevos tikes al servidor 
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

 //registro usarios nuevos 
export function crearUsuario(usuario) {
  return fetch("http://localhost:3001/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  })
    .then(function (respuesta) {
      return respuesta.json();
    });
} 
