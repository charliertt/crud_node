/* Configurar la conexión a la base de datos MongoDB*/

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/miTienda')
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('Error de conexión a MongoDB', error));
