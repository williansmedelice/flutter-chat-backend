// Librarys
const { io } = require("../index");
// Helpers
const { verifyJWT } = require("../helpers/jwt");
// Contollers
const {
  userConnect,
  userDisconnect,
  saveMessage,
} = require("../controllers/socket");

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  // Obtener JWT del cliente
  // console.log(client.handshake.headers["x-token"]);

  // Verificar JWT del cliente
  const [valido, uid] = verifyJWT(client.handshake.headers["x-token"]);

  // console.log(valido, uid);

  if (!valido) {
    return client.disconnect();
  }

  // console.log("Cliente Autenticado");

  // Cliente Autenticado
  userConnect(uid);

  // Ingresar al usuario a una sala en particular
  // Sala global, client.id, 641511528276027d701e4472
  client.join(uid);
  // client.to().emit("");

  // Escuchar del cliente el private-message
  client.on("private-message", async (payload) => {
    // console.log("Mensaje", payload);

    // Guardar Mensaje

    await saveMessage(payload);

    io.to(payload.to).emit("private-message", payload);
  });

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
    userDisconnect(uid);
  });

  client.on("mensaje", (payload) => {
    console.log("Mensaje", payload);

    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });
});
