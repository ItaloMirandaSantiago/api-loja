import { NextFunction, Request, Response } from "express"

export const Verification = (req: Request, res: Response)=>{
    res.json({sucess: true})
}