const Producto = require("../models/producto");
const Role = require("../models/role");
const usuario = require("../models/usuario");

/* Verificar si existe el correo */
const esEmailExistente = async (correo = '') => {
  const existeEmail = await usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error('El correo ya se encuentra registrado');
  }

  return true;
}

/* Verificar si existe el rol */
const esRolValido = async (role_name = "") => {
  const existeRol = await Role.findOne({ role_name });
  if (!existeRol) {
    throw new Error(`El rol ${role_name} no es permitido`);
  }

  return true;
};

/* Verificar si el nombre del producto ya existe */
const nombreProductoExiste = async (name = "") => {
  const nombre = name.toUpperCase();
  const existeNombre = await Producto.findOne({ nombre });

  if (existeNombre) {
    throw new Error(`El nombre "${nombre}" ya se encuentra registrado`);
  }

  return true;
}

/* Verificar si existe los ids ingresados */
const verificarIdProductos = async (productos = []) => {

  for (let i = 0; i < productos.length; i++){
    const existeIdProducto = await Producto.findOne({ _id: productos[i] });
    if(!existeIdProducto){
      throw new Error(`Ingrese correctamente los productos`);
    }
  }

  return true;
}

module.exports = {
  esRolValido,
  esEmailExistente,
  nombreProductoExiste,
  verificarIdProductos
};
