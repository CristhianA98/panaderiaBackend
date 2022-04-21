
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'Nombre Obligatorio']
    },
    correo:{
        type: String,
        required: [true,'Correo Obligatorio'],
        unique:true
    },
    password:{
        type: String,
        required:[true, 'Password Obligatorio']
    },
    rol:{
        type: String,
        required: true,
        default:'USER_ROLE',
        enum: ['ADMIN_ROLE','USER_ROLE','CLIENT_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function(){
    const{ __v, password, _id,...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario',UsuarioSchema);