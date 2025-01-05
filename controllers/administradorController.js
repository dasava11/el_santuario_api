import { render } from "pug";
import { success, error } from "../red/answers.js";
import { Sequelize, Op } from "sequelize";
import db from '../models/index.js';

const getAllUsers = async (req, res) => {
    const { users } = db.models;  // Desestructuración para obtener el modelo 'users'
    
    try {
      const allUsers = await users.findAll();  
      if (allUsers.length === 0) {
        return res.status(404).json({message: "No hay usuarios"})
       }
      res.status(200).json(allUsers);  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const getUserById = (req,res) => {
    res.render('administrador/consultar', {

    })
}

const createUser = (req,res) => {
    res.render('administrador/editar', {

    })
}

const deleteUser = (req,res) => {
    res.render('administrador/editar', {

    })
}

const editUser = (req,res) => {
    res.render('administrador/editar', {

    })
}

const destroyUser = (req,res) => {
    res.render('administrador/editar', {

    })
}

export {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser,
    destroyUser
}