const express = require('express');
const router = express.Router();

//Controlador
const videojuegoController = require('../controllers/videojuegoController');

//Rutas
//locahost:3000/videojuego/

router.get('/', videojuegoController.get);

router.get('/:id',videojuegoController.getById);

module.exports=router