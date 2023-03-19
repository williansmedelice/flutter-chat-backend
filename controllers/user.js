const { response, request } = require("express");
const Users = require("../models/user");

const getUsers = async (req = request, res = response) => {
  // Valor usado para la paginación
  const from = Number(req.query.from) || 0;

  // Realizamos busqueda de usuarios filtrando el uid asociado al cliente
  const users = await Users.find({ _id: { $ne: req.uid } })
    .sort("-online")
    .skip(from)
    .limit(20);

  // Respuesta a enviar con los usuarios
  res.json({
    ok: true,
    users,
  });
};

module.exports = {
  getUsers,
};
