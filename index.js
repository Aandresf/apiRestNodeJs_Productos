// index.js
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Rutas de la API para productos
app.use('/api/products', productRoutes);

// Inicio del servidor
app.listen(PORT, () => {
console.log(`Servidor corriendo en el puerto ${PORT}`);
});

