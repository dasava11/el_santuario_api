import { Sequelize, Op } from "sequelize";
import db from "../models/index.js";

const { userType } = db.models;

const createTypeUser = async (req, res) => {
  const { rol, active} = req.body;
  try {
    if (!rol || !active) {
      return res.status(400).json({ message: "No puede crearse el tipo, falta información" });
    }
    const existingTypeUser = await userType.findOne({
      where: {
        rol: {
          [Op.like]: rol,
        },
      },
    });

    if (existingTypeUser) {
      return res.status(400).json({ message: `El tipo de usuario, ${rol}, ya existe` });
    }

    await userType.create({
      rol,
      active,
    });

    return res
      .status(201)
      .json({ message: `El tipo de usuario, ${rol}, fue creado con éxito!` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTypeUsers = async (req, res) => {

    try {
      const allTypeUser = await userType.findAll() 
      
      if (allTypeUser.length === 0) {
        return res.status(404).json({ message: "No hay tipos de usuarios" });
      }
      res.status(200).json(allTypeUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const getTypeUserById = async (req, res) => {
  const { typeUser_id, id_userType} = req.params;
  const idType =  typeUser_id || id_userType
    try {
        if (idType) {
            return res
              .status(400)
              .json({ message: "No se envió un id y este es requerido." });
          }
        
          const typeUserById = await userType.findByPk(idType)
          
          if (!typeUserById) {
            return res
              .status(404)
              .json({ message: `No se encontraron tipos de usuarios con el id: ${idType}` });
          }
      
          return res.status(200).json(typeUserById);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
};

const getTypeUserByName = async (req, res) =>{
    const {rol} = req.params
    
    try {
        if (!rol || rol.trim() === "") {
          return res
            .status(400)
            .json({ message: "El rol es requerido y no puede estar vacío." });
        }
    
        const typeUserByName = await userType.findAll({
          where: {
            rol: {
              [Op.like]: `%${rol}%`,
            },
          }
        });
    
        if (typeUserByName.length === 0) {
          return res
            .status(404)
            .json({ message: `No se encontraron tipos de usuarios con el nombre: ${rol}` });
        }
    
        return res.status(200).json(typeUserByName);
      } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editTypeUser = async (req, res) => {
    const { typeUser_id, id_userType} = req.params;
    const idType =  typeUser_id || id_userType
    const { rol } = req.body;
    
      try {
        const existingTypeUser = await userType.findByPk(idType);
    
        if (!existingTypeUser) {
          return res.status(404).json({
            message: `No se encontraron tipos de usuarios con el id: ${idType}`,
          });
        }
    
        const fieldsToUpdate = {};
    
        if (rol !== undefined && rol!== existingTypeUser.rol) {
          fieldsToUpdate.rol = rol;
        }
    
        if (Object.keys(fieldsToUpdate).length === 0) {
          return res.status(200).json({
            message: "No hay cambios que realizar, los datos son los mismos.",
          });
        }
    
        await existingTypeUser.update(fieldsToUpdate);
    
        return res.status(200).json({
          message: `${rol || "El tipo de usuario"} fue actualizado con éxito`,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

};

const deleteTypeUser = async (req, res) => {

  const { typeUser_id, id_userType} = req.params;
  const idType =  typeUser_id || id_userType

  try {
    if (!id_userType) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    const existingTypeUser = await userType.findByPk(idType);

    if (!existingTypeUser) {
      return res
        .status(404)
        .json({ message: `No se encontraron tipos de usuarios con el id seleccionado: ${idType}` });
    }

    const newActiveStatus = existingTypeUser.active === 1 || existingTypeUser.active === true ? false : true;

    await existingTypeUser.update({ active: newActiveStatus });

    return res.status(200).json({
      message: `${existingTypeUser.rol} ha sido ${newActiveStatus ? 'activado' : 'desactivado'} exitosamente`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export{
createTypeUser,
getAllTypeUsers,
getTypeUserById,
getTypeUserByName,
editTypeUser,
deleteTypeUser
};