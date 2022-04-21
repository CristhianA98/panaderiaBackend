const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es Obligatorio'],
        unique:true
    },
    estado:{
        type: Boolean,
        default: true,
        required:true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    precio:{
        type:Number,
        default:0,
    },
    descripcion:{
        type:String
    },
    cantidad:{
        type:Number,
        required:true
    },
    imagenes:{
        type:Array
    }
});

ProductoSchema.methods.toJSON = function(){
    const{ __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Producto', ProductoSchema)