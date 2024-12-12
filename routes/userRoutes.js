const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas
router.get('/', userController.index);
router.get('/create', userController.create);
router.post('/store', userController.store);  // Aquí está la ruta POST para /store
router.get('/edit/:id', userController.edit);
router.post('/update/:id', userController.update);
router.get('/search', userController.search);
router.get('/delete/:id', userController.delete);

module.exports = router;