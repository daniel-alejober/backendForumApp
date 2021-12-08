const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

router.post('/',
            auth,
            [
                check('mensaje','El mensaje es obligatorio').not().isEmpty()
            ],
            messageController.crearMensaje);

router.get('/',
            auth,
            messageController.obtenerMensaje);

router.put('/:id',
            auth,
            [
                check('mensaje','El mensaje es obligatorio').not().isEmpty()
            ],
            messageController.actualizarMensaje);

router.delete('/:id',
            auth,
            messageController.eliminarMensaje);

module.exports=router;