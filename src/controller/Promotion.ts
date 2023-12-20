import { Request, Response } from "express";
import { Op } from "sequelize";
import { Produtos } from "../model/Product";

const Promotion = async (req: Request, res: Response)=>{
    const responseapi = await Produtos.findAll({where: {discount: {[Op.not]: null}}})

    for (let i = 0; i < responseapi.length; i++) {

        const parts = responseapi[i].discount.split('/')

        const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`

        const discountex = new Date(formattedDate)

        const data = new Date(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo' }).format());
        if(data > discountex){
           await Produtos.destroy({where: {id: responseapi[i].id}})
           responseapi.splice(1, i)
        }   
    }
    res.json({sucess: true, data:responseapi})
}

export default Promotion