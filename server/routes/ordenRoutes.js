//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const ordenController = require("../controllers/ordenController");

//Definición de rutas para ordenes
router.get("/", ordenController.get);

router.get("/:id", ordenController.getById);

module.exports = router;