import express from 'express'
import { connectToDatabase } from '../utils/mongodb'

const router = express.Router()
const {db,ObjectId} = await connectToDatabase()
const nomeCollection = 'prestadores'

/**
 * GET /api/prestadores
 * Lista todos os prestadores de serviço
 * Parâmetros: limit, skip e order
 */
router.get('/', async(req, res)=>{
    const {limit, skip, order} = req.query //Obter da URL
    try{
        const docs = []
        await db.collection(nomeCollection)
                .find()
                .forEach((doc) =>{
                    docs.push(doc)
                })
            res.status(200).json(docs)
    }catch(error){
        res.status(500).json(
            {message: 'Erro ao obter a listagem dos prestadores',
             error: `${error.message}`})
    }
})

export default router