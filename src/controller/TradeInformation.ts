import { Request, Response } from "express"
import { ProfitLoss } from "../model/ProfitLoss"
import { Produtos } from "../model/Product"

const TradeInformation = async (req: Request, res: Response)=>{
    try{
        const email = req.headers.admin
       const date = await ProfitLoss.findAll({where: {email}})
       const ApiInformationProduct = await Produtos.findAll({where: {email}})

       let solds = []
       let greaterProfit = []
       let checkingTheHighestProfit = 0
       
       for (let i = 0; i < ApiInformationProduct.length; i++) {
        if (ApiInformationProduct[i].sold > 0) {
            solds.push(ApiInformationProduct[i])
        }else if (ApiInformationProduct[i].sold < 0) {
            console.log(ApiInformationProduct[i])
            greaterProfit.push(ApiInformationProduct[i])
        }
        
        if (checkingTheHighestProfit < (ApiInformationProduct[i].price - ApiInformationProduct[i].productionprice)) {
            checkingTheHighestProfit = ApiInformationProduct[i].price - ApiInformationProduct[i].productionprice
            greaterProfit.push(ApiInformationProduct[i])
            greaterProfit.sort((a, b) => (b.price - b.productionprice) - (a.price - a.productionprice)).slice(0, 3)
        }

       }
        res.json({sucess: true, date, solds, greaterProfit: greaterProfit.sort((a, b) => (b.price - b.productionprice) - (a.price - a.productionprice)).slice(0, 3)})
    }catch(error){
        res.json({sucess: false, error})
    }
}

export default TradeInformation