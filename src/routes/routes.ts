import { Router } from "express";
import PrivateRouter from "../controller/privateRouter";
import createNewProduct from "../controller/createNewProduct";
import products from "../controller/products";
import deleyeDestroy from "../controller/deleteDestroy";
import { Verification } from "../controller/Verification";
import EditProduct from "../controller/EditProduct";
import CreatePromotion from "../controller/CreatePromotion";
import Promotion from "../controller/Promotion";
import multer from "multer";
import SalesProduct from "../controller/SalesProduct";

const router = Router()
const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb)=>{
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png']
        cb(null, allowed.includes(file.mimetype))
        console.log(allowed.includes(file.mimetype))
    },
    limits: {fieldSize: 10000000}
})

router.get('/ping', (req, res) =>{
    res.json({sucess: true})
})

router.post('/admin', PrivateRouter, upload.single('image'), createNewProduct)
router.post('/createpromotion', PrivateRouter, CreatePromotion)
router.get('/login', PrivateRouter, Verification)
router.get('/products', products)
router.put('/products', SalesProduct)
router.get('/promotion', Promotion)
router.delete('/deleteproduct', PrivateRouter, deleyeDestroy)
router.put('/edit', PrivateRouter, EditProduct)


export default router  