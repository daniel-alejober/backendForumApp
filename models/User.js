const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    registro:{
        type:Date,
        default:Date.now()
    }
});

module.exports= mongoose.model('Usuario',UserSchema);