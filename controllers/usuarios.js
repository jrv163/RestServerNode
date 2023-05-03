const { response, request } = require('express');

const usuariosGet = (req = request, res = response ) => {

    const { q, nombre, apikey } = req.query;

    res.json({
        msg: 'Get-API - Desde el controlador',
        q,
        nombre,
        apikey
    });
}


const usuariosPost = (req, res = response ) => {

        const { nombre, edad } = req.body;

 
        res.json({
            msg: 'post-API - desde el controlador',
            nombre,
            edad
        });
    }


const usuariosPut = (req, res = response ) => {

        const id = req.params.id;

        res.json({
            msg: 'put-API - desde el controlador',
            id
        });
    }


const usuariosPatch = ( req, res = response ) => {

        res.json({
            msg: 'patch-API - desde el controlador'
        });
    }


const usuariosDelete = (req, res = response ) => {

        res.json({
            msg: 'delete-API - desde el controlador'
        });
    }



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

}