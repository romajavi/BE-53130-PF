const fs = require("fs").promises;
const path = require("path");

class ProductManager {
    constructor(fileName = "products.json") {
        this.path = path.resolve(__dirname, '..', 'models', fileName);
    }

    async addProduct(product) {
        try {
            let products = await this.readProducts();
    
            // para verificar si ya existe un producto con el mismo código
            const existingProduct = products.find(p => p.code === product.code);
            if (existingProduct) {
                console.log(`Product with code ${product.code} already exists.`);
                return null; //error cuyando no se agraga
            }
    
            // obtiene el ultimo id
            const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
            
            // para el nuevo ID autoincremental
            const newProductId = lastProductId + 1;
    
            // el nuevo ID al producto
            product.id = newProductId;
    
            // para agregar el nuevo producto con el ID generado
            products.push(product);
    
            // Guardar 
            await this.saveProducts(products);
            return product;
        } catch (error) {
            console.log("Error adding product: ", error);
            throw error;
        }
    }

    async readProducts() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.log("Error reading products: ", error);
            throw error;
        }
    }

    async saveProducts(products) {
        try {
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.log("Error saving products: ", error);
            throw error;
        }
    }

    async updateProduct(productId, newProductData) {
        try {
            let products = await this.readProducts();
            const index = products.findIndex(product => product.id === productId);
            if (index !== -1) {
                const updatedProduct = { ...products[index], ...newProductData };
                products[index] = updatedProduct;
                await this.saveProducts(products);
                return updatedProduct;
            } else {
                return null;
            }
        } catch (error) {
            console.log("Error updating product: ", error);
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            let products = await this.readProducts();
            const index = products.findIndex(product => product.id === productId);
            if (index !== -1) {
                const deletedProduct = products.splice(index, 1)[0];
                await this.saveProducts(products);
                return deletedProduct;
            } else {
                return null;
            }
        } catch (error) {
            console.log("Error deleting product: ", error);
            throw error;
        }
    }

    
}




module.exports = ProductManager;
