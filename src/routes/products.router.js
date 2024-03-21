const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("../models/products.json");

// Ruta para listar todos los productos
router.get("/", async (req, res) => {
    try {
        const products = await productManager.readProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Ruta para obtener un producto por su id
router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        const products = await productManager.readProducts();
        const product = products.find(product => product.id === parseInt(pid));
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Ruta para actualizar un producto por su id
router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const newProductData = req.body;
    try {
        const updatedProduct = await productManager.updateProduct(parseInt(pid), newProductData);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Ruta para eliminar un producto por su id
router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        const deletedProduct = await productManager.deleteProduct(parseInt(pid));
        if (deletedProduct) {
            res.json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Ruta para agregar un nuevo producto
router.post("/", async (req, res) => {
    const newProductData = req.body;
    try {
        const newProduct = await productManager.addProduct(newProductData);
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;