import { Request, Response } from "express"
import { ProfitLoss } from "../model/ProfitLoss"
import { Produtos } from "../model/Product"
import { Op } from "sequelize"


const TradeInformation = async (req: Request, res: Response)=>{
    try{
       const date = await ProfitLoss.findAll()
       const solds = await Produtos.findAll({where: {
            sold: {
                [Op.gte]: 1
            }
       }})
        res.json({sucess: true, date, solds})
    }catch(error){
        res.json({sucess: false, error})
    }
}

export default TradeInformation