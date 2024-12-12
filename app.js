const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');

require('./config/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 


app.use('/', userRoutes);

// Puerto de la aplicación
app.listen(3000, ()=> {
    console.log('Servidor corriendo en http://localhost:3000');
})


// Configurar middleware 





// rutas
