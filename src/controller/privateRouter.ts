import { Request, Response } from "express"

const PrivateRouter = (req: Request, res: Response) =>{
    const Authorization = req.header
    res.json({teste : Authorization})
}