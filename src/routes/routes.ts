import { Router } from "express";
import PrivateRouter from "../controller/privateRouter";
import createNewProduct from "../controller/createNewProduct";

const router = Router()

router.get('/ping', (req, res) =>{
    res.json({sucess: true})
})

router.get('/admin', PrivateRouter, createNewProduct)

export default router