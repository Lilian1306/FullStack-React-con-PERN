import { Router } from 'express'
import { body, param} from 'express-validator'
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailabitlity, updateProduct } from './handers/product'
import { handleInputErrors } from './middleware'


const router = Router()

/**
 * @swagger
 * components:
 *        schemas: 
 *            Product: 
 *              type: object
 *              properties:
 *                  id: 
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monito curvo de 49 pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */


router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductsById
)
 
 router.post('/', 
   // Validacion
     body ('name')
         .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
     body ('price')
         .isNumeric().withMessage('Valor no valido')
         .notEmpty().withMessage('El precio no puede ir vacio')
         .custom(value => value > 0).withMessage('Precio no valido'),
       handleInputErrors,
       createProduct
)


 router.put('/:id', 
     param('id').isInt().withMessage('ID no valido'),
     body ('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
     body ('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
     body ('availability')
        .isBoolean().withMessage('Valor para disponibilidad  no valido'),
  handleInputErrors,
  updateProduct)


  router.patch('/:id', 
      param('id').isInt().withMessage('ID no valido'),
      handleInputErrors,
      updateAvailabitlity
   )


  router.delete('/:id', 
      param('id').isInt().withMessage('ID no valido'),
      handleInputErrors,
      deleteProduct
  )

  export default router