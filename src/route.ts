import { Router } from 'express'
import { body} from 'express-validator'
import { createProduct } from './handers/product'

const router = Router()

router.get('/', (req, res) => {
    res.json('desde GET')
 
 })
 
 router.post('/', 
   // Validacion
     body ('name')
         .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
        
     body ('price')
         .isNumeric().withMessage('Valor no valido')
         .notEmpty().withMessage('El precio no puede ir vacio')
         .custom(value => value > 0).withMessage('Precio no valido'),
       createProduct
)


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