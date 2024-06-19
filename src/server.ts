import express from 'express'

const server = express()

//Routing
server.get('/', (req, res) => {

    const datos = [
        {id: 1, nombre: 'Yoongi'},
        {id: 2, nombre: 'Jungkook'}
    ]
    res.json(datos)
})

export default server