import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import db from "./models/index.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const app = express();

// 🛑 Habilitar CORS antes de definir las rutas
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

// 🛑 Habilitar JSON y formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

// 🚀 Conexión a la base de datos
try {
  await db.sequelize.authenticate();
  console.log("Conexión correcta a la base de datos");

  if (process.env.FORCE_DB_RESET === "true") {
    await db.sequelize.sync({ force: true });
    console.log("⚠️ Base de datos reiniciada con éxito.");
  } else {
    await db.sequelize.sync();
    console.log("📌 Base de datos sincronizada sin eliminar datos.");
  }
} catch (error) {
  console.error("Error conectando a la base de datos:", error);
}

// 🛑 Definir rutas antes del `listen()`
import administradorRoute from "./routes/administradorRoutes.js";
import customerRoute from "./routes/customersRoutes.js";

app.use("/customers", customerRoute);
app.use("/controllers/administradorController", administradorRoute);

// 🎯 Ruta raíz
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de ejemplo");
});

// 📄 Configuración de Swagger
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de El Santuario con Swagger",
      version: "1.0.0",
      description: "Documentación de la API usando Swagger en Node.js con Express",
    },
    servers: [{ url: "http://localhost:3011" }],
  },
  apis: ["./routes/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 📌 Manejo de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Ocurrió un error en el servidor.";

  if (err.name === "SequelizeConnectionError") {
    return res.status(500).send({ error: "Error de conexión con la base de datos" });
  }

  if (err.type === "entity.too.large") {
    return res.status(413).send({ error: "Transferencia de data demasiado grande" });
  }

  console.error(`[Error ${status}]: ${message}`);
  res.status(status).json({ error: message });
});


// Configuración de Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Usar rutas
app.use(routes);
// 🛑 Solo un `app.listen()`
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en ${PORT}`);
});

export { db };
