const Orden = require("../models/orden");
const Producto = require("../models/producto");

const obtenerOrdenCompras = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query;

    const [total, ordenes] = await Promise.all([
        Orden.countDocuments({ estado: true }),

        Orden.find({ estado: true }, "nombre direccion telefono")
            .populate("productos", { "nombre": 1, "_id": 0, "descripcion": 1 })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        ordenes
    });
}

const obtenerOrdenComprasAdmin = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query;

    const [total, ordenes] = await Promise.all([
        Orden.countDocuments({ estado: true }),

        Orden.find({ estado: true })
            .populate("usuario", { "nombre": 1, "_id": 0 })
            .populate("productos", { "nombre": 1, "_id": 0, "descripcion": 1, "cantidad": 1, "precio": 1 })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        ordenes
    });
}

const registrarOrden = async (req, res) => {

    const { nombre, direccion, telefono, pago, productos } = req.body;

    const data = {
        nombre: nombre.toUpperCase(),
        direccion,
        telefono,
        pago,
        productos,
        usuario: req.usuario._id
    }

    /* Reducir del stock */
    let totalPago = 0;

    for (let i = 0; i < data.productos.length; i++) {
        const id = data.productos[i];
        let { precio, cantidad, nombre } = await Producto.findById(id).populate("cantidad", "precio");
        if (cantidad > 0) {
            cantidad--;
            await Producto.findByIdAndUpdate(id, { cantidad });
            totalPago = totalPago + (precio * cantidad);
        } else {
            return res.status(400),json({
                ok: "false",
                msg: `El producto "${nombre}" se encuentra en stock 0`
            });
        }
    }

    data.total = Number(totalPago.toFixed(2));

    const orden = new Orden(data);
    await orden.save({ new: true });

    res.status(200).json({
        ok: true,
        orden
    });
}

module.exports = {
    registrarOrden,
    obtenerOrdenCompras,
    obtenerOrdenComprasAdmin
}