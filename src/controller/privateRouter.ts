import { NextFunction, Request, Response } from "express"
import { User } from "../model/User"

const PrivateRouter = async (req: Request, res: Response, next: NextFunction) =>{
    const {password, admin} = req.headers
    try {
        if (typeof admin === 'string' && password) {
      
            const UserExisting = await User.findAll({where : {email: admin}})
    
            if (UserExisting.length) {
                next()
            }else{
                res.json({sucess: false, menssage: 'Usuário ou senha errados'})
            }
            
        }else{
            res.json({sucess: false, error: "senha ou e-mail incorreto"})
        }
    } catch (err) {
        res.json({sucess: false, erro: 'error no servidor tente novamente mais tarde', err})
    }
}

export default PrivateRouter