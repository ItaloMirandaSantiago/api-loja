import { Request, Response } from "express"
import {Produtos} from '../model/Product'

const products = async(req: Request, res: Response)=>{
    const email = req.headers.admin
    let data = await Produtos.findAll({where:{discount: null, email }})

    res.json({sucess: true, data })   
}

export default products