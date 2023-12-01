import { NextFunction, Request, Response } from "express"

const createNewProduct = (req: Request, res: Response) =>{
    res.json({sucess: true})
}

export default createNewProduct