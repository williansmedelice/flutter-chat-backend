/*
  path: api/messages
 */
// Librarys
const { Router } = require("express");
// Controllers
const { getChat } = require("../controllers/messages");
// Middlewares
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/:from", validateJWT, getChat);

module.exports = router;
