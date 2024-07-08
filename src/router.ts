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

/** 
 * @swagger
 * /api/products:
 *      get: 
 *          summary: get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200:
 *                  description: successful response
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: array 
 *                              items:
 *                               $ref: '#/components/schemas/Product'
 * 
*/

router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get: 
 *      summary: Get a product by Id
 *      tags: 
 *          - Products
 *      description: Return a product based on its uinique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema: 
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 * 
 */

router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductsById
)

/***
 * @swagger
 * /api/products: 
 *  post: 
 *      summary: Create a new product
 *      tags: 
 *          - Products
 *      description: Return a new record in the database
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties: 
 *                              name: 
 *                                  type: string
 *                                  example: "Monitor curvo de 49 Pulgadas"
 *                              price: 
 *                                  type: number
 *                                  example: 399
 *      responses:
 *          201:
 *            description: Product created successfully
 *          400:
 *            description: Bad Request - Invalid input data                            
 * 
 */
 
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