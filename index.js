import express from 'express'

const server = express()


const PORT = 3001

server.listen(PORT, ()=> {
    console.log(`el servidor está funcionando en el puerto ${PORT}`)
})