const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '' )=> {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`)
    }
}

const emailExite = async( correo = '' ) => {

        const existeEmail = await Usuario.findOne({ correo });
        if ( existeEmail ){
            throw new Error(`El correo ${ correo }, ya fue registrado`)
        }

}

const existeUsuarioPorId = async( id ) => {

        const existeUsuario = await Usuario.findById( id );
        if ( !existeUsuario ){
            throw new Error(`No existe un usuario con el ID ${ id }`)
        }

}



module.exports = {
    esRolValido,
    emailExite,
    existeUsuarioPorId
}