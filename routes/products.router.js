import express from 'express'
import {productsManager} from '../app.js'
const router = express.Router()


router.get("/api/products", async(req,res)=>{
    try {
        const limit = parseInt(req.query.limit)
        const products = await productsManager.getProducts(limit)
        console.log(products)
        res.json(products)
        
    } catch (error) {
        res.status(500).json({Error:error.message})
    }
})

router.get("/api/products/:pid",async(req,res)=>{
    try {
        const id = parseInt(req.params.pid)
        const product = await productsManager.getProductById(id)
        res.json(product)
    } catch (error) {
        res.status(500).json({Error:error.message})
    }
})

router.post("/api/products",async(req,res)=>{
    try {
        const newProduct = req.body.shift()
        console.log(newProduct)
        const addedProduct = await productsManager.addProduct(newProduct)
        res.json(addedProduct)
    } catch (error) {
        res.status(500).json({Error:error.message})
    }
})

router.put("/api/products/:pid", async (req,res)=>{
    try{
        const id = parseInt(req.params.pid)
        const updatedProduct= req.body.shift()
        const updProduct = await productsManager.updateProduct(id,updatedProduct)
        res.json(updProduct)
    } catch (error) {
        res.status(500).json({Error:error.message})
    }
})

router.delete("/api/products/:pid",async (req,res)=>{
    try {
        const id = parseInt(req.params.pid)
        const deletedProduct = await productsManager.deleteProduct(id)
        res.json(deletedProduct)
    } catch (error) {
        res.status(500).json({Error:error.message})
    }
})


export default router