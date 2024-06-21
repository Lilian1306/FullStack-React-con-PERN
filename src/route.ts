import { Router } from 'express'
import { createProduct } from './handers/product'

const router = Router()

router.get('/', (req, res) => {
    res.json('desde GET')
 
 })
 
 router.post('/', createProduct)


 router.put('/', (req, res) => {
     res.json('desde PUT')
  
  })
  router.patch('/', (req, res) => {
     res.json('desde PATCH')
  
  })
  router.delete('/', (req, res) => {
     res.json('desde DELETE')
  
  })

  export default router