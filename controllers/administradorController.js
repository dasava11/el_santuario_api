import { Sequelize, Op } from "sequelize";
import db from "../models/index.js";

const getAllUsers = async (req, res) => {
  const { users, shopping, userType } = db.models; // Desestructuración para obtener el modelo 'users'

  try {
    const allUsers = await users.findAll({
      include: [
        { model: shopping, as: "shoppings" },
        { model: userType, as: "type_user_user_type" },
      ],
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
  const { users, shopping, userType } = db.models;
  const { id } = req.params;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "No se envió un id y este es requerido." });
    }
    const userById = await users.findByPk(id, {
      include: [
        { model: shopping, as: "shoppings" },
        { model: userType, as: "type_user_user_type" },
      ],
    });

    if (!userById) {
      return res
        .status(404)
        .json({ message: `No se encontraron usuarios con el id: ${id}` });
    }

    return res.status(200).json(userById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByName = async (req, res) => {
  const { users, shopping, userType } = db.models;
  const { name } = req.query;
  try {
    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ message: "El nombre es requerido y no puede estar vacío." });
    }

    const userByName = await users.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      include: [
        { model: shopping, as: "shoppings" },
        { model: userType, as: "type_user_user_type" },
      ],
    });

    if (userByName.length === 0) {
      return res
        .status(404)
        .json({ message: `No se encontraron usuarios con el nombre: ${name}` });
    }

    return res.status(200).json(userByName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { users } = db.models;
  const { id_user, username, password, email, type_user, active } = req.body;
  try {
    if (id_user || username || password || email || type_user || active) {
      return res.status(400).json({ message: "Falta información" });
    }
    const existingUser = await users.findOne({
      where: {
        name: {
          [Op.like]: username,
        },
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: `${username} ya existe` });
    }

    await users.create({
      username,
      password,
      email,
      type_user,
      active,
    });

    return res
      .status(201)
      .json({ message: `${username} fue creado con éxito!` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editUser = async (req, res) => {
  const { users } = db.models;
  const { id_user, username, password, email, type_user } = req.body;
  try {
    const existingUser = await users.findByPk(id_user);

    if (!existingUser) {
      return res.status(404).json({
        message: `No se encontraron usuarios con el id: ${id_user}`,
      });
    }

    if (username) {
      await existingUser.update({ username });
    }

    if (password) {
      await existingUser.update({ password });
    }

    if (email) {
      await existingUser.update({ email });
    }

    if (type_user) {
      await existingUser.update({ type_user });
    }

    return res
      .status(200)
      .json({ message: `${username} fue actualizado con éxito` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { users } = db.models;
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    const existingUser = await users.findByPk(id);

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: `No se encontraron usuarios con el id: ${id}` });
    }

    if (existingUser.active === true) {
      await existingUser.update({ active: false });
      return res.status(200).json({
        message: `${existingUser.name} fue desactivado exitosamente`,
      });
    } else {
      await existingUser.update({ active: true });
      return res
        .status(200)
        .json({ message: `${existingUser.name} fue activado exitosamente` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const destroyUser = async (req, res) => {
  const { users, shopping, userType } = db.models;
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    if (isNaN(id)) {
      return res.status(400).json({ message: "Id invalido" });
    }

    const response = await users.findByPk(id);
    await response.destroy();
    return res
      .status(200)
      .json({ message: `${response.name} fue borrado exitosamente` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
