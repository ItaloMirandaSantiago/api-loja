import { Produtos } from "../model/Product"
import { User } from "../model/User"
import request from 'supertest'
import api from '../api'

describe('criação de produtos', ()=>{
    const email = 'italofodaa'
    const password = "1234"
    beforeAll(async()=>{
            await User.sync({force: true})
            await Produtos.sync({force: true})

       await request(api).post('createuser')
        .send({email, password, password1: password})
    })

    it("criação de produto", (done)=>{
        try {
            request(api).post('admin')
            .send({title: 'teste', description: "foipourra", unit: 9, price:10, productionprice:2})
            .auth('password', password)
            .auth('email', email)
            .then(response => {
                console.log(response)
                expect(response.body.sucess).toBe(true)
                expect(response.body.produto).toBeDefined()
                return done()
            })
        } catch (error) {
            console.log(error)
            return done()
        }

    })
})