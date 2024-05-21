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

describe('API REST de prestadores com o token', ()=>{
    let token //Armazenaremos o access_token JWT
    it('POST - Autenticar usuário para retornar token JWT', async()=>{
        const senha = process.env.SENHA_USUARIO
        const response = await request(baseURL)
        .post('/usuarios/login')
        .set('Content-Type', 'application/json')
        .send({"email": "joaolucas@gmail.com", "senha": senha})
        .expect(200) //OK

        token = response.body.access_token
        expect(token).toBeDefined() // Recebos o token?
    })

    it('GET - Listar os prestadores com autenticação', async() =>{
        const response = await request(baseURL)
        .get('/prestadores')
        .set('Content-Type', 'application/json')
        .set('access-token', token) //Inclui o token na chamada
        .expect(200)

        const prestadores = response.body
        expect(prestadores).toBeInstanceOf(Array)
    })

    dadosPrestador = {
        "cnpj" : "45190324008930",
        "razao_social" : "JOSÉ BERNARDO TRANSPORTES LTDA V.3",
        "cep" : "13310160",
        "endereco" : {
            "logradouro": "Av. Presidente Kennedy, 321",
            "complemento" : "",
            "bairro" : "Centro",
            "localidade" : "Votorantim",
            "uf" : "sp"
        },
        "cnae_fiscal": 451510,
        "nome_fantasia" : "ALCINA",
        "data_inicio_atividade": "2022-07-22",
        "localizacao": {
            "type" : "Point",
            "coordinates": [-23.2904, -47.2963]
        }
    }

    it('POST - Inclui um novo prestador com autenticação', async()=>{
        const response = await request(baseURL)
        .post('/prestadores')
        .set('Content-Type', 'application/json')
        .set('access-token', token)
        .send(dadosPrestador)
        .expect(201) //Created

        expect(response.body).toHaveProperty('acknowledged')
        expect(response.body.acknowledged).toBe(true)

        expect(response.body).toHaveProperty('insertedId')
        expect(typeof response.body.insertedId).toBe('string')
        idPrestadorInserido = response.body.insertedId
        expect(response.body.insertedId.length).toBeGreaterThan(0)
    })

    it('GET /:id - lista o prestador pelo id com token', async()=>{
        const response = await request(baseURL)
        .get(`/prestadores/id/${idPrestadorInserido}`)
        .set('Content-Type', 'application/json')
        .set('access-token', token)
        .expect(200)
    })

    it('GET /:id - lista o prestador pela razão com token', async()=>{
        const response = await request(baseURL)
        .get(`/prestadores/razao/${dadosPrestador.razao_social}`)
        .set('Content-Type', 'application/json')
        .set('access-token', token)
        .expect(200)
    })
})