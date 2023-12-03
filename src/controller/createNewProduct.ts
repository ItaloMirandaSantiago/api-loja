import { Request, Response } from "express"
import {Produtos} from '../model/User'

const createNewProduct = async (req: Request, res: Response) =>{
    const {title, description, unit, price} = req.body
    try{
        let produto = await Produtos.create({
            title, description,unit,price
        })
        res.json({sucess: true, produto})
    }catch(err){
        res.json({sucess: false, erro: 'item não encontrado'})
    }
}

export default createNewProduct