import { render } from "pug";
import { success, error } from "../red/answers.js";
import { Sequelize, Op } from "sequelize";
import db from "../models/index.js";

const getAllUsers = async (req, res) => {
  const { users } = db.models; // Desestructuración para obtener el modelo 'users'

  try {
    const allUsers = await users.findAll({
      include: [{ model: purchases }, { model: userType }],
    });

    if (allUsers.length === 0) {
      return res.status(404).json({ message: "No hay usuarios" });
    }

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { users, purchases, userType } = db.models;
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    const userById = await users.findByPk(id, {
      include: [{ model: purchases }, { model: userType }],
    });

    if (!userById) {
      return res
        .status(404)
        .json({ message: `No se encontraron usuarios con el id: ${id}` });
    }
    return res.status(200).json(userById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserByName = async (req, res) => {
  const { name } = req.query;
  const { users } = db.models;
  try {
    if (!name) {
      return res.status(400).json({ message: "No se envió un nombre" });
    }
    const userByName = await users.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      include: [{ model: purchases }, { model: userType }],
    });

    if (userByName.length === 0) {
      return res.status(400).json({ message: `${name} no fue encontrado` });
    }

    return res.status(200).json(userByName);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createUser = (req, res) => {
  res.render("administrador/editar", {});
};

const deleteUser = (req, res) => {
  res.render("administrador/editar", {});
};

const editUser = (req, res) => {
  res.render("administrador/editar", {});
};

const destroyUser = (req, res) => {
  res.render("administrador/editar", {});
};

export {
  getAllUsers,
  getUserById,
  getUserByName,
  createUser,
  editUser,
  deleteUser,
  destroyUser,
};
