import { Request, Response } from "express";
import { Produtos } from "../model/Product";

const CreatePromotion = async (req: Request, res: Response)=>{
    const {id, discount, newprice} = req.body
    console.log(req.body, id, discount )
    
    
        try{
            if (id && !isNaN(parseFloat(discount)) && !isNaN(newprice)) {
                const response = await Produtos.findOne({where : {id}})

                const noformat = new Date()
        
                noformat.setDate(noformat.getDate() + parseFloat(discount))
        
                const data = new Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(noformat)
                
                if (response && Number(newprice) < Number(response.price)) {
                    await response.update({
                        discount: data,
                        newprice
                    })
                    // new Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date())
                    res.json({sucess: true, response})
                }else{
                    res.json({sucess:false, error: 'erro em encontrar usuário ou no valor do preço da promoção'})
                }
            }else{
                res.json({sucess: false, error: 'parâmetros invalidos'})
            }
        }catch(error){
            res.json({sucess: false, error})
        }

}

export default CreatePromotion