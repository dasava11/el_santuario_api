import fs from 'fs';
import path from 'path';
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Instancia de Sequelize desde db.js
import initModels from './init-models.js';

const basename = path.basename(import.meta.url);
const db = {};

// Leer los modelos en la carpeta actual
fs.readdirSync(new URL('.', import.meta.url))
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(async (file) => {
    const { default: defineModel } = await import(new URL(file, import.meta.url));
    const model = defineModel(sequelize, DataTypes);
    db[model.name] = model;
  });

// Configurar relaciones entre los modelos
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Inicializar los modelos con initModels
const models = initModels(sequelize);

// Agregar los modelos y la instancia de Sequelize al objeto `db`
db.models = models;
db.sequelize = sequelize;

export default db;
