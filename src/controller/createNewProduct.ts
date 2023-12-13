import { Request, Response } from "express"
import {Produtos} from '../model/User'

const createNewProduct = async (req: Request, res: Response) =>{
    const {title, description, unit, price} = req.body

    try{
        if (title !== '' && description !== '' && price > 0 && unit > 0) {

            let produto = await Produtos.create({
                title, description,unit,price
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