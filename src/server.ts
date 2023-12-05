import express,{Request, Response} from 'express'
import path from 'path'
import dotenv from 'dotenv'
import router from './routes/routes'
import cors from "cors"

dotenv.config()

const server = express()

server.use(cors())

server.use(express.json())
server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({extended: true}))

server.use('/', router)

server.use((req : Request, res: Response)=>{
    res.status(404)
    res.json({sucess : false, error : "rota não encontrada"})
})

server.listen(process.env.PORT, ()=>{
    console.log('rodando')
} )