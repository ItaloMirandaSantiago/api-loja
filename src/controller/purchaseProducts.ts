import { Request, Response } from "express";
import { Produtos } from "../model/Product"
import { ProfitLoss } from "../model/ProfitLoss"
import { Op } from "sequelize"

const Purchase = async (req: Request, res: Response)=>{

    const currentData = new Date()
    const year = currentData.getFullYear()
    const month = String(currentData.getMonth() + 1).padStart(2, '0')
    const day = String(currentData.getDate()).padStart(2, '0')
    const dataFormat = `${year}-${month}-${day}`
    let profit = 0
    console.log(dataFormat)
    const { products } = req.body
    console.log(req.body)
    try{
        if (products.length > 0) {
            console.log('entrouu')
             const product = await Produtos.findAll({where: {id:{ [Op.in]: products.map((t: { id: number })=>t.id)}}})
            console.log(`esse é o valor de produto ${product}`)
            if (products && product.length > 0) {
                for (let i = 0; i < product.length; i++) {
                    if (product[i].id === products[0].id) {

                        await product[i].update({
                            unit: (product[i].unit + products[0].sale),
                        })  
                        profit = profit - (product[i].productionprice * products[0].sale)

                        products.splice(0, 1)
                    }
                    
                }
       

                const ProfitLossDB = await ProfitLoss.findOne({where: {data: dataFormat}})
                
                if (ProfitLossDB) {
                    console.log('entrou')
                    console.log(profit)
                    await ProfitLossDB.update({
                        result: (ProfitLossDB.result + profit)
                    })
                    res.json({sucess: true, ProfitLossDB, profit})
                }else{
                    console.log('else')
                    await ProfitLoss.create({
                        result: profit
                    })
                    res.json({sucess: true, product: 'adicionado', profit})
                }
            }else{
                res.json({sucess: false, error: "produto não encontrado"})
            }
            
        }else{
            res.json({sucess: false, error: "paramêtro incorreto"})
        }
    }catch(err){
        console.log(err)
        res.json({sucess: false, error: 'error interno do servidor'})
    }
    
}

export default Purchase