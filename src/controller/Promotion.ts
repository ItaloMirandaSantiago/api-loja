import { Request, Response } from "express";
import { Op } from "sequelize";
import { Produtos } from "../model/Product";

const Promotion = async (req: Request, res: Response)=>{
    try{
        const email = req.headers.admin
        const responseapi = await Produtos.findAll({where: {email, discount: {[Op.not]: null}}})

        for (let i = 0; i < responseapi.length; i++) {
    
            const parts = responseapi[i].discount.split('/')
    
            const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`
    
            const discountex = new Date(formattedDate)
    
            const data = new Date(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo' }).format());
            if(data > discountex){
               await responseapi[i].update({
                discount: null
               })
               
               responseapi.splice(1, i)
            }   
        }
        res.json({sucess: true, data:responseapi})
    }catch(error){
        
    }

}

export default Promotion