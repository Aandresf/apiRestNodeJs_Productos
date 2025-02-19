// routes/clientsRoutes.js
const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clientsController');

// Obtener todos los clientes
router.get('/', clientsController.getAllClients);

// Obtener un cliente por ID
router.get('/:id', clientsController.getClientById);

// Crear un nuevo cliente
router.post('/', clientsController.createClient);

// Actualizar un cliente existente
router.put('/:id', clientsController.updateClient);

// Eliminar un cliente
router.delete('/:id', clientsController.deleteClient);

module.exports = router;