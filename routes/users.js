/*
  path: api/users
 */
// Librarys
const { Router } = require("express");
// Controllers
const { getUsers } = require("../controllers/user");
// Middlewares
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", validateJWT, getUsers);

module.exports = router;
