const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerProductos, agregarProducto } = require("../controllers/productos");
const { nombreProductoExiste } = require("../helpers/db-validator");
const { esImagenFile } = require("../middlewares/validar-archivo");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles");
const router = new Router();

router.get("/",obtenerProductos);

router.post("/",[
    validarJWT,
    esAdminRole,
    esImagenFile,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('precio','El precio es obligatorio').notEmpty(),
    check('cantidad','La cantidad es obligatoria').notEmpty(),
    check('descripcion','La descripción es obligatoria').notEmpty(),
    check('nombre').custom(nombreProductoExiste),
    validarCampos
],agregarProducto);

module.exports = router;