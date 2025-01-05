/* import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({path: '.env'})

// Configuración de la base de datos
const sequelize = new Sequelize(
  process.env.BD_NOMBRE,
  process.env.BD_USER,
  process.env.BD_PASS ?? '',
  {
    host: process.env.BD_HOST,
    port: 3306,
    dialect: 'mysql',
    define: {
      timestamps: true, // Añadir createdAt y updatedAt automáticamente
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false, // Deshabilitar logs de consultas SQL en producción
  }
);

export default sequelize;
 */

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const db = new Sequelize (process.env.BD_NOMBRE,process.env.BD_USER,process.env.BD_PASS ?? '',{
    host:process.env.BD_HOST,
    port:3306,
    dialect: 'mysql',
    define:{
        timestamps: true
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    operatorAliases: false

});

export default db ;