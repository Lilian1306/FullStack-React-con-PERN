import express from 'express'
import colors from 'colors'
import router from './route'
import db from './config/db'

// Conectar a base de datos
export async function connectDB(){
    try{
       await db.authenticate()
       db.sync()
       console.log( colors.blue('Conexion exitosa a la DB'))

    }catch (error){
        // console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar a la BD'))
    }
}
connectDB()

// Instancia de express
const server = express()

// Leer datos de formulario
server.use(express.json())


server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({msg: 'Desde Api'})
})


export default server