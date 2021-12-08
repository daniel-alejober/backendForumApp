const Mensaje = require('../models/Message');
const {validationResult} = require('express-validator');

exports.crearMensaje=async(req,res)=>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()});
    }
    try {
        const mensaje = new Mensaje(req.body);
        mensaje.creador =req.usuario.id;
        mensaje.save();
        res.json(mensaje);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerMensaje= async(req,res)=>{
    try {
        const mensajes = await Mensaje.find({creador:req.usuario.id}).sort({creado:-1});
        res.json({mensajes})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarMensaje= async(req,res)=>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()});
    }
    const {mensaje}= req.body;
    const nuevoMensaje= {};

    if(mensaje){
        nuevoMensaje.mensaje= mensaje;
    }
    try {
        let mensaje = await Mensaje.findById(req.params.id);
        if(mensaje.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'});
        }
        mensaje= await Mensaje.findByIdAndUpdate({_id:req.params.id}, {$set:nuevoMensaje},{new:true});
        res.json({mensaje});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarMensaje= async(req,res)=>{
    try {
        let mensaje = await Mensaje.findById(req.params.id);
        if(mensaje.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'});
        }
        await Mensaje.findOneAndRemove({_id:req.params.id});
        res.json({msg:'Mensaje Eliminado'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}