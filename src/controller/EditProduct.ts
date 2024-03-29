import { Request, Response } from "express"
import { Produtos } from "../model/Product"

const EditProduct = async (req: Request, res: Response) => {
    const {id, title, description, unit, price} = req.body
    const email = req.headers.admin
    try{
        if (id) {

            const responseApi = await Produtos.findOne({where : {id, email}})
     
            if (responseApi) {
     
           const a = await responseApi.update({
                 title: title ? title : 'responseApi.title',
                 description: description ? description : responseApi.description,
                 unit: unit ? unit : responseApi.unit,
                 price: price ? price : responseApi.price
             })
     
             res.json({sucess: true, a})
            }else{
             res.json({sucess: false, error: 'produto não encontrado'})
            }
         }else{
             res.json({sucess: false, error: 'paramêtros invalidos'})
         }
    }catch(err){
        res.json({sucess: false, error: "servidor fora do ar"})
    }

}

export default EditProduct