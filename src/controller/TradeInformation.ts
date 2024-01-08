import { Request, Response } from "express"
import { ProfitLoss } from "../model/ProfitLoss"
import { Produtos } from "../model/Product"

const TradeInformation = async (req: Request, res: Response)=>{
    try{
       const date = await ProfitLoss.findAll()
       const ApiInformationProduct = await Produtos.findAll()

       let solds = []
       let loss = []
       for (let i = 0; i < ApiInformationProduct.length; i++) {
        if (ApiInformationProduct[i].sold > 0) {
            solds.push(ApiInformationProduct[i])
        }else if (ApiInformationProduct[i].sold < 0) {
            loss.push(ApiInformationProduct[i])
        }
        
       }
        res.json({sucess: true, date, solds, loss})
    }catch(error){
        res.json({sucess: false, error})
    }
}

export default TradeInformation