import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import db from "./models/index.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const app = express();

// 🛑 Habilitar CORS antes de definir las rutas
app.use(
  cors({
    origin: "http://localhost:3000", // Permitir solo desde este frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Permitir envío de cookies si se necesitan
  })
);

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

// 🛑 Solo un `app.listen()`
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en http://localhost:${PORT}`);
});

export { db };
