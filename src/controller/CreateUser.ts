import { Request, Response } from "express"
import { User } from "../model/User"
import bcrypt from 'bcrypt'

const CreateUser = async (req: Request, res: Response) => {
    const {password, email, password1} = req.body
    console.log(password, email, password1)

    try {
            if (password && email && password1) {
                if (password === password1) {
                    const UserExisting = await User.findAll({where : {email}})
               
                    if (UserExisting.length) {
                        res.json({sucess: false, menssage: "Usuario já consta no sistema", UserExisting})
                    }else{
                        const hash = bcrypt.hashSync(password, 10)
                        const NewUser = await User.create({email, password: hash})
                        if (NewUser) {
                            res.json({sucess: true, menssage: "Usuário criado com sucesso", password, email})
                        }else{
                            res.json({sucess: false, error: "servidor fora do ar - não foi possivel criar usuário"})
                        }
                    }
                }else{
                    res.json({sucess: false,  menssage: "as senhas não são iguais"})
                }
            }else{
                res.json({sucess: false, menssage: "pârametros faltantes"})
            }
    } catch (err) {
        res.json({sucess: false, error: "servidor fora do ar", err})
    }

}

export default CreateUser