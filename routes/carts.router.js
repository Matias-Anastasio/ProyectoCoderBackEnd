import express from 'express'
import {cartsManager} from '../app.js'

const router = express.Router()

router.post("/api/carts", async(req,res)=>{
    try {
        const newCart = req.body.shift()
        const addedCart = await cartsManager.addCart(newCart)
        res.json(addedCart)
    } catch (error) {
        res.status(500).json({Error:error.message})
    }
})


router.get("/api/carts/:cid", async(req, res)=>{
    try {
        const cid= parseInt(req.params.cid)
        const cartProducts = await cartsManager.listProducts(cid)
        res.json(cartProducts)
    } catch (error) {
        res.status(500).json({Error:error.message})
    }
})

router.post("/api/carts/:cid/product/:pid", async (req,res)=>{
    try {
        const cid= parseInt(req.params.cid)
        const pid= parseInt(req.params.pid)
        const qty= req.body.shift().qty
        const addedProduct = await cartsManager.addProduct(cid,pid,qty)
        res.json(addedProduct)
    } catch (error) {
        res.status(500).json({Error:error.message})
    }
})


export default router