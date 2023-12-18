import { Router } from "express";
import PrivateRouter from "../controller/privateRouter";
import createNewProduct from "../controller/createNewProduct";
import products from "../controller/products";
import deleyeDestroy from "../controller/deleteDestroy";
import { Verification } from "../controller/Verification";
import EditProduct from "../controller/EditProduct";
import PromotionProduct from "../controller/PromotionProduct";

const router = Router()

router.get('/ping', (req, res) =>{
    res.json({sucess: true})
})

router.post('/admin', PrivateRouter, createNewProduct)
router.post('/promotion', PrivateRouter, PromotionProduct)
router.get('/login', PrivateRouter, Verification)
router.get('/products', products)
router.delete('/deleteproduct', PrivateRouter, deleyeDestroy)
router.put('/edit', PrivateRouter, EditProduct)


export default router  