import { NextFunction, Request, Response } from "express"
import multer from "multer"

const upload = multer()



const VerificationImage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './tmp')
    },
    filename: (req, file, cb)=>{
        const random = Math.floor(Math.random() * 9999999) 
        cb(null, `${random+Date.now()}`)
    }
})

export default VerificationImage