import fs from 'fs/promises'
import { productsManager } from '../app.js'

export class CartsManager {
    constructor() {
        this.filePath = "./data/carts.json"
    }

    async cartId() {
        try {
            const carts = await this.getCarts()
            console.log(carts.length)
            if (carts.length === 0) return 1
            const IDs = carts.map(cart => cart.cid)
            const max = Math.max(...IDs)
            return max + 1
        } catch (error) {
            return { error: error }
        }
    }

    async writeFile(carts) {
        const cartsJson = JSON.stringify(carts)
        try {
            await fs.writeFile(this.filePath, cartsJson, 'utf-8')
        } catch (error) {
            console.log("error de escritura: ", error)
        }
    }

    async getCarts() {
        try {
            let carts = []
            if (await fs.access(this.filePath).then(() => true).catch(() => false)) {
                const fileContent = await fs.readFile(this.filePath, "utf-8")
                carts = JSON.parse(fileContent)
                return carts
            }
        } catch (error) {
            console.log("error al leer el archivo")
        }
        return []
    }

    async getCartById(id) {
        try {
            const carts = await this.getCarts()
            const cartFound = carts.find(cart => cart.cid === id)
            if (cartFound) {
                return cartFound
            } else {
                return "Not found"
            }

        } catch (error) {
            return { error: error }
        }
    }

    async addCart(cart) {
        try {
            const carts = await this.getCarts()
            const products = await productsManager.getProducts()
            if (cart.products.every(prod => !prod.pid && !prod.qty)) {
                console.log("faltan datos")
                return
            } else if (!cart.products.every(prod1 => products.some(prod2 => prod2.id === prod1.pid))) {
                return "un producto del carrito no esta registrado"
            } else {
                const newCart = { ...cart, "cid": await this.cartId() }
                carts.push(newCart)
            }
            this.writeFile(carts)
            return { message: "carrito creado con éxito" }
        } catch (error) {
            return { error: error }
        }
    }

    async addProduct(cid, pid, qty) {
        try {
            const products = await productsManager.getProducts()
            const carts = await this.getCarts()
            const cart = await this.getCartById(cid)
            const index = carts.findIndex(cart => cart.cid === cid)
            if (cart === "Not found") {
                return "Not found"
            }
            if (!products.some(prod => prod.id === pid)) {
                return "el producto no esta registrado"
            }
            const prodInCart = await cart.products.find(prod => prod.pid === pid)
            if (prodInCart) {
                prodInCart.qty += qty
            } else {
                cart.products.push({ pid, qty })
            }
            carts.splice(index, 1, cart)
            this.writeFile(carts)
            return { message: "producto agregado con éxito" }
        } catch (error) {
            return { error: error.message }
        }
    }

    async listProducts(cid) {
        try {
            const cart = await this.getCartById(cid);

            const promises = cart.products.map(async (prod) => {
                const filteredProduct = await productsManager.getProductById(prod.pid);
                return { ...filteredProduct, qty: prod.qty };
            });
            const products = await Promise.all(promises);

            return products;
        } catch (error) {
            return { error: "error al buscar el carrito" }
        }
    }
}
