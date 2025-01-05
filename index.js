import express from 'express';
import cors from 'cors'; // Paquete integrado en las dependencias modernas
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

// habilitar lectura de datos de formularios
app.use(express.urlencoded({extended: true}))
app.use(express.json({ limit: "10mb" })); // Habilitar lectura de JSON

// Configuración de CORS
app.use(
  cors({
    origin: '*', // Permitir solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true, // Habilitar envío de cookies si es necesario
  })
);

// Configuración para manejar cookies sin cookie-parser
app.use((req, res, next) => {
  req.cookies = {}; // Crear un objeto para almacenar cookies
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    cookieHeader.split(';').forEach((cookie) => {
      const [key, value] = cookie.split('=');
      req.cookies[key.trim()] = decodeURIComponent(value);
    });
  }
  next();
});

// Configuración de Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Usar rutas
app.use(routes);

// Manejo de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Ocurrió un error en el servidor.';

  // Error específico para problemas de conexión con Sequelize
  if (err.name === 'SequelizeConnectionError') {
    return res.status(500).send({ error: 'Error de conexión con la base de datos' });
  }

   // Manejo de error de carga demasiado grande
  if (err.type === "entity.too.large") {
    return res.status(413).send({ error: "Tranferencia de data demasiado grande" });
  }
 
  // Manejo de errores generales
  console.error(`[Error ${status}]: ${message}`);
  res.status(status).json({ error: message });
});

const PORT = 3011;
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});

export{
    db
}