const mongoose = require('mongoose');

const mensajeSchema = mongoose.Schema({
    mensaje:{
        type:String,
        require:true,
        trim:true
    },
    creador:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    creado:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model('Mensaje',mensajeSchema);