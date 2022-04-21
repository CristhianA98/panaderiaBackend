const Producto = require("../models/producto");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const obtenerProductos = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query;

    const [total, productos] = await Promise.all([
        Producto.countDocuments({ estado: true }),

        Producto.find({ estado: true })
            .populate("usuario", "nombre")
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        productos
    });
}

const agregarProducto = async (req, res) => {
    const { nombre, descripcion, precio, cantidad } = req.body;
    const filesUrl = [];

    for (let i = 0; i < req.files.file.length; i++) {
        const { tempFilePath } = req.files.file[i];
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { upload_preset: "panaderia" });
        filesUrl.push(secure_url);
    }

    const data = {
        nombre: nombre.toUpperCase(),
        descripcion,
        precio,
        cantidad,
        usuario: req.usuario._id,
        imagenes: filesUrl
    }

    const producto = new Producto(data);
    await producto.save({ new: true });

    res.status(200).json({
        ok: true,
        producto
    });
}

module.exports = {
    obtenerProductos,
    agregarProducto
}