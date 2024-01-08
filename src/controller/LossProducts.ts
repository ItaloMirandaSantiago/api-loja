import { Request, Response } from "express"
import { Produtos } from "../model/Product"
import { ProfitLoss } from "../model/ProfitLoss"
import { LossProductDB } from "../model/LossProducts";


const LossProduct = async (req: Request, res: Response)=>{
    const currentData = new Date();
    const year = currentData.getFullYear();
    const month = String(currentData.getMonth() + 1).padStart(2, '0');
    const day = String(currentData.getDate()).padStart(2, '0');
    const dataFormat = new Date(`${year}-${month}-${day}`);
    const { id } = req.body

    try{
        if (id > 0) {
            const product = await Produtos.findOne({where: {id}})

            if (product) {
                await product.update({
                    unit: (product.unit - 1),
                    sold: ++product.sold
                })    

                const ProfitLossDB = await ProfitLoss.findOne({where: {data: dataFormat}})
                console.log(product)

                const lossname = await LossProductDB.findOne({where: {title: product.title}})
                if (lossname) {
                    lossname.update({
                        loss: lossname.loss - product.price
                    })
                }else{
                    await LossProductDB.create({
                        title: product.title,
                        loss: -product.price,
                        lossproduct: product.id
                    })
                }

                if (ProfitLossDB) {
                    await ProfitLossDB.update({
                        result: (ProfitLossDB.result - product.productionprice)
                    })
                    res.json({sucees: true, ProfitLossDB})
                }else{
                    await ProfitLoss.create({
                        result: -product.productionprice
                    })
                    res.json({sucess: true, ProfitLossDB})
                }
            }else{
                res.json({sucess: false, error: "produto não encontrado ou sem unidades"})
            }
            
        }else{
            res.json({sucess: false, error: "paramêtro incorreto"})
        }
    }catch(err){
        console.log(err)
        res.json({sucess: false, error: 'error interno do servidor'})
    }
}

export default LossProduct