const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    // Comprobar si existe el email
    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }

    const user = new User(req.body);

    // Encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar Nuevo Usuario
    await user.save();

    console.log(user);

    // Generar JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      msg: "Crear usuario !!!!",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Comprobar si existe el email
    const userDB = await User.findOne({ email: email });

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    // Validar el Password
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña no es valida",
      });
    }

    // Generar el JWT
    const token = await generateJWT(userDB.id);

    // console.log(userDB)

    res.json({
      ok: true,
      user: userDB,
      token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, msg: "Hable con el administrador" });
  }
};

const renewToken = async (req = request, res = response) => {
  const uid = req.uid;

  // Generar un nuevo JWT

  const token = await generateJWT(uid);

  // Obtener usuario por *uid*
  const user = await User.findById(uid);

  return res.json({ ok: false, user, token });
};

module.exports = {
  createUser,
  login,
  renewToken,
};
