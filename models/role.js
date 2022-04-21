
const { Schema, model } = require('mongoose');

const roleSchema = Schema({
    role_name:{
        type: String,
        required: [true,'Rol obligatorio']
    }
});

module.exports = model('Role', roleSchema)