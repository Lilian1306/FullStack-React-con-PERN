import express from 'express'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from './config/swagger'
import router from './router'
import db from './config/db'

// Conectar a base de datos
export async function connectDB(){
    try{
       await db.authenticate()
       db.sync()
       //console.log( colors.blue('Conexion exitosa a la DB'))

    }catch (error){
        // console.log(error)
        console.log(colors.red.bold("Hubo un error al conectar a la base de datos"))
    }
}
connectDB()

// Instancia de express
const server = express()

// Leer datos de formulario
server.use(express.json())

server.use('/api/products', router)

// DOCS
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server