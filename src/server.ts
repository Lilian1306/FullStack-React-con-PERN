import express from 'express'
import colors from 'colors'
import router from './route'
import db from './config/db'

// Conectar a base de datos
async function connectDB(){
    try{
       await db.authenticate()
       db.sync()
       console.log( colors.blue('Conexion exitosa a la DB'))

    }catch (error){
        // console.log(error)
        console.log( colors.bgRed.bold ('Hubo un error al conectar a la BD'))
    }
}
connectDB()

const server = express()
server.use('/api/products', router)


export default server