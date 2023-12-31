import { Request, Response } from "express"
import { Produtos } from "../model/Product"
import { ProfitLoss } from "../model/ProfitLoss"


const SalesProduct = async (req: Request, res: Response)=>{
    const currentData = new Date()
    const year = currentData.getFullYear()
    const month = String(currentData.getMonth() + 1).padStart(2, '0')
    const day = String(currentData.getDate()).padStart(2, '0')
    const dataFormat = `${year}-${month}-${day}`
    console.log(dataFormat)
    const { id } = req.body
    try{
        if (id > 0) {
            const product = await Produtos.findOne({where: {id}})
            console.log(dataFormat)
            if (product) {
                await product.update({
                    unit: (product.unit - 1),
                    sold: ++product.sold
                })    

                const ProfitLossDB = await ProfitLoss.findOne({where: {data: dataFormat}})
                
                if (ProfitLossDB) {
                    console.log('entrou')
                    await ProfitLossDB.update({
                        result: (ProfitLossDB.result + (product.price - product.productionprice))
                    })
                    res.json({sucees: true, ProfitLossDB})
                }else{
                    console.log('else')
                    await ProfitLoss.create({
                        result: (product.price - product.productionprice)
                    })
                    res.json({sucess: true, product: 'adicionado'})
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

export default SalesProduct