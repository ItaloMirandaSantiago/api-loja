import { NextFunction, Request, Response } from "express"

const PrivateRouter = (req: Request, res: Response, next: NextFunction) =>{
    const {password, admin} = req.headers
    console.log(req.headers)
    if (admin === 'adminServerOwner' && password === "12345678911") {
        next()
    }else{
        res.json({sucess: false, error: "senha ou e-mail incorreto"})
    }
}

export default PrivateRouter