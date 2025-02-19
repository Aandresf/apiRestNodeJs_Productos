// index.js
const express = require('express');

const productRoutes = require('./routes/productRoutes');
const clientsRoutes = require('./routes/clientsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Rutas de la API para productos
app.use('/api/products', productRoutes);

// Rutas de la API para clientes
app.use('/api/clients', clientsRoutes);

// Inicio del servidor
app.listen(PORT, () => {
console.log(`Servidor corriendo en el puerto ${PORT}`);
});

