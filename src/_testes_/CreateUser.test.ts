import request from 'supertest'
import api from '../api'
import { User } from '../model/User'
import { Produtos } from '../model/Product'

describe('Teste de rotas', ()=>{

    const email = 'italofodaa'
    const password = "1234"

    beforeAll(async ()=>{
      //  await User.destroy({ truncate: true, cascade: true });
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
    } catch (error) {
        console.error('Erro durante a configuração dos testes:', error);
        throw error; // Lança o erro para que o teste falhe explicitamente
    }
        try {
            await User.sync({force: true})
        } catch (error) {
            console.log(error)
        }

     })


    it("testar se a as rotas estão respondendo ping", (done)=>{
        request(api).get('/ping').then(
            response =>{
                expect(response.body.sucess).toBe(true)
                return done()
            }
        )
    })

    it("criação de usuarios ", (done)=>{
        request(api).post('/createuser')
        .send({email, password, password1: password})
        .then(
            response =>{
                expect(response.body.sucess).toBe(true)
                expect(response.body.menssage).toBe('Usuário criado com sucesso')
                return done()
            }
        )
    })

    it("criando um usuario que já consta no sistema ", (done)=>{
        request(api).post('/createuser')
        .send({email, password, password1: password})
        .then(
            response =>{
                expect(response.body.sucess).toBe(false)
                expect(response.body.menssage).toBe('Usuario já consta no sistema')
                return done()
            }
        )

    })
})
