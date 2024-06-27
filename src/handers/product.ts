import { Request, Response} from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req: Request, res: Response) => {
    try {
       const products = await Product.findAll({
          order: [
             ['price', 'DESC']
          ]
       })
       res.json({data: products})
    }catch(error){
        console.log(error)
    }
}

export const getProductsById = async (req: Request, res: Response) =>{
    try{
       const { id } = req.params
       const product = await Product.findByPk(id)

       if(!product){
         return res.status(404).json({
            error: 'Producto No Encontrado'
         })
       }

       res.json({data: product})
    }catch(error){
       console.log(error)
    }
}

export const createProduct = async (req : Request, res : Response) => {
       try {
        const product = await Product.create(req.body)
        res.json({data: product})
       } catch (error){
        console.log(error)
       }
    }


    // Consulta al producto 
    export const updateProduct = async (req: Request, res: Response) => {
         const {id} = req.params
         const product = await Product.findByPk(id)

         // ver si existe
         if(!product) {
            return res.status(404).json({
               error: 'Producto No Encontrado'
            })
         }

         // procedemos a actualizar
         await product.update(req.body)
         await product.save()
         res.json({data: product})
    }

    export const updateAvailabitlity = async (req: Request, res:Response) => {
         const {id} = req.params
         const product = await Product.findByPk(id)

         if(!product){
            return res.status(404).json({
               error: 'Producto No Encontrado'
            })
         }

         product.availability = !product.dataValues.availability
         await product.save()

         res.json({data: product})

    }
    // PUT = reemplaza todo lo que estamos enviando ACTUALIZA
    // PATCH = reemplaza los unicos elementos que queremos o que enviamos. MODIFICA

    export const deleteProduct = async (req: Request, res: Response) => {
       const {id} = req.params
       const product = await Product.findByPk(id)

       if(!product) {
         return res.status(404).json({
            error: 'Producto No Encontrado'
         })
       }
       await product.destroy()
       res.json({data: 'Producto Eliminado'})
    }