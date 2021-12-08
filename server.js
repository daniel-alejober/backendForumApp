const express = require('express');
const conectarDB = require('./config/db');
const PORT = process.env.PORT || 4000;
const app = express();
const cors = require('cors');

conectarDB();

app.use(cors());
app.use(express.json({extended:true}));

app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));

app.listen(PORT,()=>{
    console.log(`El servidor esta en el puerto ${PORT}`);
});