import { Request, Response } from "express"
import { User } from "../model/User"

const CreateUser = async (req: Request, res: Response) => {
    const {password, email, password1} = req.body

    try {

            User.create({email, password})

        res.json({sucess: true, menssage: "ai ze da manga", password, email})
    } catch (err) {
        res.json({sucess: false, error: "servidor fora do ar", err})
    }

}

export default CreateUser