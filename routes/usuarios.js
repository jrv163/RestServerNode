
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExite, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch } = require('../controllers/usuarios');



const router = Router();


    router.get('/', usuariosGet );


    router.put('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('rol').custom( esRolValido ),
        validarCampos
    ] ,usuariosPut);


    router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio y debe tener 6 o más caracteres').isLength({ min:6 }),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( emailExite ),
        // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( esRolValido ),
        validarCampos
    ] ,usuariosPost);


    router.delete('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
    ] ,usuariosDelete);
    

    router.patch('/', usuariosPatch );


module.exports = router;