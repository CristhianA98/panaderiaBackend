const { Router } = require("express");
const { check } = require("express-validator");
const { registrarOrden, obtenerOrdenCompras, obtenerOrdenComprasAdmin } = require("../controllers/orden");
const { verificarIdProductos } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esClientRole, esDeliveryRole, esAdminRole } = require("../middlewares/validar-roles");

const ObjectId = require('mongoose').Types.ObjectId;
const router = new Router();

router.get("/delivery",[
    validarJWT,
    esDeliveryRole,
    validarCampos
],obtenerOrdenCompras);

router.get("/admin",[
    validarJWT,
    esAdminRole,
    validarCampos
],obtenerOrdenComprasAdmin);

router.post("/", [
    validarJWT,
    esClientRole,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('direccion', 'La dirección es obligatoria').notEmpty(),
    check('telefono', 'El teléfono es obligatorio').notEmpty(),
    check('pago', 'Método de pago debe ser "EFECTIVO" o "TARJETA"').isIn(['EFECTIVO', 'TARJETA']),
    check('productos','Ingrese al menos una caja').notEmpty(),
    check('productos').isArray().custom(ids => {
        ids.forEach(id => {
            if (!ObjectId.isValid(id)) {
                throw new Error(`ID Incorrecto`);
            }
        });
        return true;
    }),
    check('productos').custom(verificarIdProductos),
    validarCampos
], registrarOrden);

module.exports = router;