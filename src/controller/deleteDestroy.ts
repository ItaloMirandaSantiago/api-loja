import { Request, Response } from "express"
import {Produtos} from '../model/Product'

const deleyeDestroy = async (req: Request, res: Response)=>{
    const {id} = req.body
    console.log(req.body)
    if (id) {
        try{
            await Produtos.destroy({where : {id}})
            res.json({sucess: true})
        }catch(error){
            res.json({sucess: false, erro: 'item não encontrado'})
        }
    }else{
        res.json({sucess: false})
    }
}

export default deleyeDestroy
