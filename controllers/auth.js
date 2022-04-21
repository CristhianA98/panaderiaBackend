const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const res = require('express/lib/response');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        //Verificar si existe el email
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario/Password no válido'
            });
        }

        // Verficar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario/Password no válido: estado false'
            });
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario/Password no válido'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al crear el token"
        });
    }
}

module.exports = {
    login
}