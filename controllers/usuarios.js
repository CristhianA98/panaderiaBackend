const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

const obtenerUsuarios = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),

    Usuario.find({ estado: true })
      .skip(Number(desde))
      .limit(Number(limite))
  ]);

  res.json({
    total,
    usuarios
  })
};

const ingresarUsuario = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  /* Encriptar password */
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  /* Guardar información */
  await usuario.save();

  res.status(201).json({
    ok: true,
    usuario
  });

};

module.exports = {
  obtenerUsuarios,
  ingresarUsuario,
};
