import express from 'express'
import routes from './routes/index.js'
import db from './config/db.js'



const app = express()

//conexion a la base de datos
try{
    await db.authenticate();
    db.sync()
    console.log('Conexion Correcta a la Base de datos')
} catch(error){
console.log(error)
}

// Habilitar Pug

app.set( 'view engine','pug')
app.set('views','./views')


// Usa las rutas desde el archivo de rutas
app.use(routes);


const PORT = 3001

app.listen(PORT, ()=> {
    console.log(`el servidor está funcionando en el puerto ${PORT}`)
})