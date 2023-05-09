const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const Usuario = require('../models/usuario');


const coleccionesPermitidas = ['usuarios']

const buscarUusarios = async(  termino = '', res = response ) => {

    const esMongoId = ObjectId.isValid( termino ); // True

    if ( esMongoId ){

        const usuario = await Usuario.findById(termino);
        res.json({
            results: (usuario) ? [ usuario ] : []
        })
    }

    const regex = new RegExp( termino, 'i' );

    const usuarios = await Usuario.find({ 
        $or: [ {nombre: regex}, { correo: regex } ],
        $and: [{ estado: true }]
    })

    res.json({
        results: usuarios
    })

}


const buscar = ( req, res = response ) => {

    const { coleccion, termino } = req.params; 

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }
     

    switch (coleccion) {
        case 'usuarios':
            buscarUusarios(termino, res)
            break;
        default:
         return   res.status(500).json({
                msg: 'No se ha implementado esa busqueda'
            });
    }


  }



module.exports = {
    buscar,
    
}