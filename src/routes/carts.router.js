const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/carts-manager.js");
const path = require("path");
const cartManager = new CartManager(path.join(__dirname, "../models/carts.json"));

// ruta para crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ruta para obtener los productos de un carrito por su ID
router.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartManager.getCartById(parseInt(cid));
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        res.json(cart.products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ruta para agregar un producto a un carrito
router.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const updatedCart = await cartManager.addProductToCart(parseInt(cid), parseInt(pid), parseInt(quantity));
        if (!updatedCart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;