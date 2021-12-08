const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/userController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');


router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email','Agregar un email valido').isEmail(),
    check('password','Debe tener 6 caracteres').isLength({min:6})
    ],
    usuarioController.crearUsuario);

router.get('/',
        auth,
        usuarioController.usuarioAutenticado
);

module.exports= router;