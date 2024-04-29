import { Produtos } from "../model/Product"
import { User } from "../model/User"
import request from 'supertest'
import api from '../api'

describe('criação de produtos', () => {
    const email = 'italofodaa'
    const password = "1234"

    beforeAll(async () => {

        try {
            const userTableExists = await User.describe().then(() => true).catch(() => false);
            const produtosTableExists = await Produtos.describe().then(() => true).catch(() => false);
    
            if (produtosTableExists) {
                await Produtos.drop();
            }
    
            if (userTableExists) {
                await User.drop();
            }
    
            await User.sync({ force: true });
            await Produtos.sync({ force: true });
    
            await request(api).post('/createuser')
                .send({ email, password, password1: password });
        } catch (error) {
            console.error('Erro durante a configuração dos testes:', error);
            throw error; // Lança o erro para que o teste falhe explicitamente
        }
    })

    it("criação de produto", (done) => {
        request(api).post('/admin')
            .set({'password': password, 'admin': email})
            .send({ title: 'teste', description: "foipourra", unit: 9, price: 10, productionprice: 2 })
            .then(async response => {
                expect(response.body.sucess).toBe(true); 
                expect(response.body.produto).toBeDefined();
               return done();
            })
    })

    it('deletar produto', (done) =>{
        const productId = 1
        request(api).delete('/deleteproduct')
        .set({'password': password, 'admin': email})
        .send({id: productId})
        .then(async response =>{
            expect(response.body.sucess).toBe(true)
            return done();
        })
    })
})
