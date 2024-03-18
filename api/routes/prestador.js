import express from 'express'
import { connectToDatabase } from '../utils/mongodb.js'

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
                .limit(parseInt(limit) || 10)
                .skip(parseInt(skip) || 0)
                .sort({order: 1})
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


/**
 * GET /api/prestadores/id/:id
 * Lista o prestador de serviço pelo id
 * Parâmetros: id
 */

router.get('/id/:id', async (req, res)=>{
    try{
        const docs = []
        await db.collection(nomeCollection)
            .find({'_id': {$eq: new ObjectId(req.params.id)}},{})
            .forEach((doc)=>{
                docs.push(doc)
            })
            res.status(200).json(docs)
    }catch(err){
        res.status(500).json({
            errors: [{
                value: `${err.message}`,
                msg: 'Erro ao obter o prestador pelo ID',
                param: '/id/:id'
            }]
        })
    }
})
export default router