const User = require('../models/user');

// Mostrar todos los usuarios index
exports.index = async (req, res) => {
    try {
        const users = await User.find();
        res.render('index', { 
            users, 
            message: ''  // Aseguramos que 'message' siempre esté definida
        });
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.search = async (req, res) => {
    const { query } = req.query;  // Obtener el parámetro de búsqueda desde la URL

    try {
        // Filtrar los usuarios que coincidan con el nombre
        const users = await User.find({
            name: new RegExp(query, 'i')  // Busca de manera insensible a mayúsculas y minúsculas
        });

        // Si no hay coincidencias, se agrega un mensaje
        if (users.length === 0) {
            return res.render('index', { 
                users: [], 
                message: 'No se encontraron usuarios que coincidan con la búsqueda.' 
            });
        }

        // Si hay coincidencias, se renderiza la página con los usuarios
        res.render('index', { 
            users, 
            message: ''  // Pasamos un mensaje vacío si hay usuarios encontrados
        });
    } catch (error) {
        res.status(500).send(error);
    }
};


// Mostrar formulario para crear un usuario
exports.create = async (req, res) => {
    const user = null;
    console.log(user);
    res.render('create', {user});
}; 




exports.store = async (req, res) => {
    const {name, email, age} = req.body;
    try{
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.redirect('/');
    }catch (error){
        res.status(500).send(error);
    }
};
// Cuando le da la opción de editar un usuario (carga los datos en el formulario
// para editarlos)
exports.edit = async (req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.render('create', {user});
    }catch(error){
        res.status(500).send(error);
    }
};

// Cuando el usuario le da al boton de guardar para que modifique los datos en la BD
exports.update = async (req, res) =>{
    const  {name, email, age} = req.body;
    try{
        await User.findByIdAndUpdate(req.params.id,{name, email, age});
        res.redirect('/');
    }catch(error){
        res.status(500).send(error);
    }
};

// Eliminar un usuario
exports.delete = async (req, res) =>{
    console.log(req.params.id)
    try{
        await User.findByIdAndDelete(req.params.id);        
        res.redirect('/');
    }catch(error){
        res.status(500).send(error);
    }
};

