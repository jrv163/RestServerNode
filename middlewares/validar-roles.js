const { response, request } = require("express");


const esAdminRole = (req = request, res = response, next ) => {


    if ( !req.usuario ){
        
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar token primeramente'
        })
    }

    const { rol, nombre } = req.usuario;

    if ( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${ nombre } no es administrador -  No puede realizar la acción`
        });
    }


   next();
}


const tieneRole = ( ...roles ) => {
    return ( req, res = response, next) => {

        
        if ( !req.usuario ){
            
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar token primeramente'
            })
        }

        if ( !roles.includes( req.usuario.rol ) ){

            res.status(401).json({
                msg: `El servicio requere uno de estos roles ${ roles }`
            });
        }

        next();
    }

}


module.exports = {
    esAdminRole,
    tieneRole
}