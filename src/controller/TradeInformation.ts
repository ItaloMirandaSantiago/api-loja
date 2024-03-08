import { Request, Response } from "express"
import { ProfitLoss } from "../model/ProfitLoss"
import { Produtos } from "../model/Product"

const TradeInformation = async (req: Request, res: Response)=>{
    try{
        const email = req.headers.admin
       const date = await ProfitLoss.findAll({where: {email}})
       const ApiInformationProduct = await Produtos.findAll({where: {email}})

       let solds = []
       let loss = []
       let greaterProfit = 0
       for (let i = 0; i < ApiInformationProduct.length; i++) {
        if (ApiInformationProduct[i].sold > 0) {
            solds.push(ApiInformationProduct[i])
        }else if (ApiInformationProduct[i].sold < 0) {
            console.log(ApiInformationProduct[i])
            loss.push(ApiInformationProduct[i])
        }
        
        if (greaterProfit < (ApiInformationProduct[i].price - ApiInformationProduct[i].productionprice)) {
            greaterProfit = ApiInformationProduct[i].price - ApiInformationProduct[i].productionprice
            loss.push(ApiInformationProduct[i])
            loss.sort((a, b) => (b.price - b.productionprice) - (a.price - a.productionprice)).slice(0, 3)
        }

       }
        res.json({sucess: true, date, solds, loss: loss.sort((a, b) => (b.price - b.productionprice) - (a.price - a.productionprice)).slice(0, 3)})
    }catch(error){
        res.json({sucess: false, error})
    }
}

export default TradeInformation