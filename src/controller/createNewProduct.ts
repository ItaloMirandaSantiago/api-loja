import { Request, Response } from "express"
import {Produtos} from '../model/Product'

const createNewProduct = async (req: Request, res: Response) =>{
    const {title, description, unit, price} = req.body
    console.log(req.body)
    try{
        if (title !== '' && description !== '' && !isNaN(Number(price)) && unit > 0) {
            console.log(Number(price))
            let produto = await Produtos.create({
                title, description,unit,price: Number(price)
            })
            res.json({sucess: true, produto})   
        }else{
            res.json({sucess: false, error: 'parâmetros incorretos'})
        }
    }catch(err){
        res.json({sucess: false, erro: 'paramêtros invalidos'})
    }
}

export default createNewProduct