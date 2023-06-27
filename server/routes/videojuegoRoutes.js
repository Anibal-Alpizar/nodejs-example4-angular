const express = require('express');
const router = express.Router();

//Controlador
const videojuegoController = require('../controllers/videojuegoController');

//Rutas
//locahost:3000/videojuego/

router.get('/', videojuegoController.get);

router.post('/', videojuegoController.create);

router.get('/:id', videojuegoController.getById);

router.put('/:id', videojuegoController.update);

module.exports = router;
