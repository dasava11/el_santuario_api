import express from 'express';
import routes from './routes/index.js';
import db from './models/index.js';

const app = express();

// Conexión a la base de datos
try {
  await db.sequelize.authenticate(); // Usar la instancia de Sequelize
  await db.sequelize.sync(); // Sincronizar modelos
  console.log('Conexión correcta a la base de datos');
} catch (error) {
  console.error('Error conectando a la base de datos:', error);
}

// Configuración de Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Usar rutas
app.use(routes);

const PORT = 3011;
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});

export{
    db
}