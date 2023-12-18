import { Request, Response } from "express";
import { Produtos } from "../model/Product";

const PromotionProduct = async (req: Request, res: Response)=>{
    const {id, promotion} = req.body
    console.log(req.body, id, promotion)
    
    if (id && !isNaN(parseFloat(promotion))) {

        const response = await Produtos.findOne({where : {id}})

        const noformat = new Date()

        noformat.setDate(noformat.getDate() + parseFloat(promotion))

        const data = new Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(noformat)

        if (response) {
            await response.update({
                discount: data
            })
            // new Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date())
            res.json({sucess: true, response})
        }else{
            res.json({sucess: false, error: 'item não encontrado'})
        }
    }else{
        res.json({sucess: false, error: 'parâmetros invalidos'})
    }
}

export default PromotionProduct