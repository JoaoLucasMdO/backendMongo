/**
 * Testes na API prestadores
 * Tecnologias utilizadas:
 * Supretest: Biblioteca para testes na API Rest do NodeJS
 * dotenv: Biblioteca para gerenciar vairiáveis de ambiente
 */

const request = require('supertest')
const dotenv = require('dotenv')
dotenv.config() //Carrega as variáveis do .env

const baseURL = 'http://localhost:4000/api'

describe('API REST de Prestadores sem o Token', ()=>{
    it('GET / - Lista todos os prestadores sem o token', async()=>{
        const response = await request(baseURL)
        .get('/prestadores')
        .set('Content-Type', 'application/json')
        .expect(401) //Unauthorized
    })

    it('GET / Obtém o Prestador pelo ID sem o token', async() =>{
        const id = '65efaaedcafdbdcd7d7f0432'
        const response = await request(baseURL)
        .get(`/prestadores/id/${id}`)
        .set('Content-Type','application/json')
        .expect(401)
    })

    it('GET / Obtém o Prestador pela Razão sem o token', async() =>{
        const razao = 'SERVIÇOS'
        const response = await request(baseURL)
        .get(`/prestadores/id/${razao}`)
        .set('Content-Type','application/json')
        .expect(401)
    })
})