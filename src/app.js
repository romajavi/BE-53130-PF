// Importacienes generales
const express = require('express');
const path = require('path');
const app = express();
const PUERTO = 8080;

// import. enrutadores para productos y carritos
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');

// import.  del controlador para la gestión de productos
const ProductManager = require('./controllers/product-manager.js');

// instancia del gestor de productos con la ruta del archivo JSON de productos
const productManager = new ProductManager(path.join(__dirname, 'models/products.json'));

// conf.g middleware para el análisis de JSON y URL codificada
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// confg. de las rutas para los enrutadores de productos y carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Todo Ok :) !');
});

// Inicio dee servidor
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});