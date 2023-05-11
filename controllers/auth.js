const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrycpt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async( req, res = response ) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el Email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        // SI el usuario existe
        if ( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        // Verificar la contraseña
        const validPassword = bcrycpt.compareSync( password, usuario.password ); 
        if ( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
           usuario,
           token
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({ 
            msg:'Hable con el administrador'
        })
    }

}

const googleSignIn = async(req, res = response ) => {

    const { id_token } = req.body;

    try {

        const {correo, nombre, img} = await googleVerify( id_token );
       // console.log({ googleUser })

       let usuario = await Usuario.findOne({ correo });

       if ( !usuario ) {
         // tengo que crearlo

         const data = {
            nombre,
            correo,
            password: ':p',
            img,
            google: true
         };

         usuario = new Usuario( data );
         await usuario.save();
       }


       // Si el usuario en DB
       if ( !usuario.estado ) {
        return res.status(401).json({
            msg: 'Hable con el administrador - Usuario bloqueado'
        });
       }

       // Generar JWT
       const token = await generarJWT( usuario.id );


    res.json({
        usuario,
        token
     })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error en la autenticación - El token no se pudo verificar'
        })
    }

   


}

module.exports = {
    login,
    googleSignIn
}