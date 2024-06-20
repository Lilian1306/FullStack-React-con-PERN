import express from 'express'
import router from './route'

const server = express()

server.use('/api/products', router)


export default server