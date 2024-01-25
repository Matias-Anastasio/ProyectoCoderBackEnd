import express from 'express'
import path from 'path'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import {ProductsManager} from './src/productManager.js'
import {CartsManager} from './src/cartManager.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

export const productsManager = new ProductsManager()
export const cartsManager = new CartsManager()

app.use('/', productsRouter)
app.use('/', cartsRouter)

app.listen(PORT, ()=>{
    console.log("Servidor escuchando en el puerto 8080")
})