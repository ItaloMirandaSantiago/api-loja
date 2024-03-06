import api from './api'
import dotenv from 'dotenv'

dotenv.config()

api.listen(process.env.PORT, ()=>{
    console.log('rodando')
} )