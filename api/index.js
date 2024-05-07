import express from 'express'
import { config } from 'dotenv'
config() //Carrega as variáveis do .env

const app = express()
const {PORT} = process.env
//Import das rotas da aplicação
import RotasPrestadores from './routes/prestador.js'
import RotasUsuarios from './routes/usuario.js'

app.use(express.json()) //Habilita o parse do JSON

//Rota de conteúdo público
app.use('/', express.static('public'))

//Removendo o X-powered-by por segurança
app.disable('X-powered-by')

//Configurando o favicon
app.use('/favicon.ico', express.static('public/images/ControleLogo.png'))

//Rota default
app.get('/api', (req, res) => {
    res.status(200).json({
        message: 'API FATEC 100% funcional🚀',
        version: '1.0.0'
    })
})
//Rotas da API
app.use('/api/prestadores', RotasPrestadores)
app.use('/api/usuarios', RotasUsuarios)

//Listen
app.listen(PORT, function(){
    console.log(`💻Servidor rodando na porta ${PORT}`)
})