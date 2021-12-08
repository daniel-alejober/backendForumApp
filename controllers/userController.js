const Usuario = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} =require('express-validator');
 
exports.crearUsuario = async(req,res)=>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()});
    }
    const {email, password}= req.body;

    try {
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({msg:'El usuario ya existe'});
        }
        usuario = new Usuario(req.body);
        const salt = await bcryptjs.genSalt(10);
        usuario.password= await bcryptjs.hash(password,salt);
        await usuario.save();
        const payload ={usuario:{id:usuario.id}}
        jwt.sign(payload,process.env.SECRETA,{expiresIn:3600},
            (error,token)=>{
                if(error) throw error;
                res.json({token});
            });
            
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.usuarioAutenticado =async (req,res)=>{
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error'});
    }
}