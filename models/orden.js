const { Schema, model } = require('mongoose');

const OrdenSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es Obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es Obligatoria'],
    },
    telefono: {
        type: String,
        default: "123",
    },
    pago: {
        type: String
    },
    total: {
        type: Number,
        default: 0
    },
    date:{
        type: Date,
        default: Date.now()
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    productos: {
        type: [Schema.Types.ObjectId],
        ref: 'Producto',
        required: true
    }
});

OrdenSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Orden', OrdenSchema)