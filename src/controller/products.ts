import { Request, Response } from "express"
import {Produtos} from '../model/User'

const products = async(req: Request, res: Response)=>{
    let data = await Produtos.findAll()

    res.json({sucess: true, data })   
}

export default products