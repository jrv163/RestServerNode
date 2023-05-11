const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');




const usuariosGet = async(req = request, res = response ) => {

    
    const { limite = 1, desde = 0} = req.query;
    const query = { estado: true }
   

        const [ total, usuarios ] = await Promise.all([
            Usuario.countDocuments(query),

            Usuario.find(query)
            .skip( Number(desde) )
            .limit(Number(limite)), // consulta según cantidad
         

        ])

        res.json({
            total,
            usuarios,
            
        });
}


const usuariosPost = async(req, res = response ) => {

       

        const { nombre, correo, password, rol } = req.body;
        const usuario = new Usuario({ nombre, correo, password, rol });


        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        usuario.password = bcryptjs.hashSync( password, salt );

        // Guardar base de datos
       await usuario.save();

 
        res.json({
            usuario
        });
    }


const usuariosPut = async(req, res = response ) => {

        const id = req.params.id;
        const { _id, password, google, correo, ...resto  } = req.body;

        if ( password ) {

            //Encriptar la contraseña
            const salt = bcryptjs.genSaltSync(10);
            resto.password = bcryptjs.hashSync( password, salt );

        }

        const usuario = await Usuario.findByIdAndUpdate( id, resto );


        res.json({
            usuario
        });
    }


const usuariosDelete = async(req, res = response ) => {

        const {id} = req.params;

     

        // Eliminar un usuario fisicamente de la base de datos
        // const usuario = await Usuario.findByIdAndDelete( id );

        const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } ); // Es una forma de eliminar el usuario pero sin perder la información, cambiando solo su estado

        

        res.json({
            usuario,
    
        });
    }



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete

}