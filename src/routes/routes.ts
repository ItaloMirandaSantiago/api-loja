import { Router } from "express";
import PrivateRouter from "../controller/privateRouter";
import createNewProduct from "../controller/createNewProduct";
import products from "../controller/products";
import deleyeDestroy from "../controller/deleteDestroy";

const router = Router()

router.get('/ping', (req, res) =>{
    res.json({sucess: true})
})

router.post('/admin', PrivateRouter, createNewProduct)
router.get('/products', products)
router.delete('/deleteproduct', PrivateRouter, deleyeDestroy)

export default router