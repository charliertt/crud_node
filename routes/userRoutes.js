const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');

// Configuración de multer para almacenamiento de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para el archivo
    }
});

const upload = multer({ storage: storage }); // Configuramos multer con el almacenamiento definido

// Rutas
router.get('/', userController.index);
router.get('/create', userController.create);
router.post('/store', upload.single('img'), userController.store);  // Añadimos 'upload.single('img')'
router.get('/edit/:id', userController.edit);
router.post('/update/:id', upload.single('img'), userController.update);  // Añadimos 'upload.single('img')'
router.get('/search', userController.search);
router.get('/delete/:id', userController.delete);

module.exports = router;
