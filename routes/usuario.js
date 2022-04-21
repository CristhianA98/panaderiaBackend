const { Router } = require("express");
const { check } = require("express-validator");
const { ingresarUsuario, obtenerUsuarios } = require("../controllers/usuarios");
const { esRolValido, esEmailExistente } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = new Router();

router.get("/",obtenerUsuarios);

router.post("/register", [
  check("nombre", "El nombre es obligatorio").notEmpty(),
  check("correo", "El correo es obligatorio").isEmail(),
  check("password", "El password debe contener más de 6 caracteres").isLength({ min: 6 }),
  check("rol").custom(esRolValido),
  check("correo").custom(esEmailExistente),
  validarCampos,
], ingresarUsuario);

module.exports = router;
