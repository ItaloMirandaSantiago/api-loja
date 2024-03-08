import { Request, Response } from "express"
import {Produtos} from '../model/Product'

const deleyeDestroy = async (req: Request, res: Response)=>{
    const {id} = req.body
    const email = req.headers.admin
    if (id) {
        try{
            await Produtos.destroy({where : {id, email}})
            res.json({sucess: true})
        }catch(error){
            res.json({sucess: false, erro: 'item não encontrado'})
        }
    }else{
        res.json({sucess: false})
    }
}

export default deleyeDestroy
