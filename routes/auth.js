const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

// Ruta para crear un nuevo usuario
router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    validateFields,
  ],
  createUser
);

// Ruta para logear usuario
router.post(
  "/",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    validateFields,
  ],
  login
);

//Rura para renovar token *validateJWT*
router.get("/renew", validateJWT, renewToken);

module.exports = router;
