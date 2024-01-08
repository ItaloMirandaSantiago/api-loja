import { Request, Response } from "express"
import {Produtos} from '../model/Product'
import sharp from "sharp"
import { unlink } from "fs/promises"


const createNewProduct = async (req: Request, res: Response) =>{
    const {title, description, unit, price, productionprice} = req.body
    console.log(req.body)

    try{
        if (title !== '' && description !== '' && !isNaN(Number(price)) && unit > 0 && !isNaN(Number(productionprice))) {

            if (req.file) {
                await sharp(req.file.path).resize(500).toFormat('jpg').toFile(`src/public/media/${req.file.filename}.jpg`)
                await unlink(req.file.path)
            }

            let produto = await Produtos.create({
                title, description,unit,price: price, productionprice
            })

            res.json({sucess: true, produto})   
        }else{
            res.json({sucess: false, error: 'parâmetros incorretos'})
        }
    }catch(err){
        if (req.file) {
            await unlink(req.file.path)   
        }
        res.json({sucess: false, erro: 'error no servidor', err})
    }
}

export default createNewProduct