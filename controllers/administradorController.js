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
  const { user_id } = req.params;
  try {
    if (!user_id) {
      return res
        .status(400)
        .json({ message: "No se envió un id y este es requerido." });
    }
    const userById = await users.findByPk(user_id, {
      include: [
        { model: shopping, as: "shoppings" },
        { model: userType, as: "type_user_user_type" },
      ],
    });

    if (!userById) {
      return res
        .status(404)
        .json({ message: `No se encontraron usuarios con el id: ${user_id}` });
    }

    return res.status(200).json(userById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByName = async (req, res) => {
  const { username } = req.query;
  console.log(username)
  const { users, shopping, userType } = db.models;
  try {
    if (!username || username.trim() === "") {
      return res
        .status(400)
        .json({ message: "El nombre es requerido y no puede estar vacío." });
    }

    const userByName = await users.findAll({
      where: {
        username: {
          [Op.like]: `%${username}%`,
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
        .json({ message: `No se encontraron usuarios con el nombre: ${username}` });
    }

    return res.status(200).json(userByName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { users, userType } = db.models;
  const { username, password, email, type_user, active } = req.body;
  try {
    if ( !username || !password || !email || type_user === undefined|| active === undefined) {
      return res.status(400).json({ message: "Falta información" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    const existingUser = await users.findOne({
      where: {
        username: {
          [Op.like]: `%${username}%`,
        },
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: `${username} ya existe` });
    }

    const userTypeData = await userType.findOne({
      where: { id_userType: type_user },
    });

    if (!userTypeData) {
      return res.status(400).json({ message: `El tipo de usuario con ID ${type_user} no existe` });
    }

    if (userTypeData.active === 0) {
      return res.status(400).json({ message: `El tipo de usuario ${userTypeData.rol} está desactivado y no puede ser asignado` });
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
      .json({ message: `El usuario ${username} fue creado con éxito!` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editUser = async (req, res) => {
  const { users } = db.models;
  const {user_id} = req.params
  const { username, password, email, type_user } = req.body;

  try {
    const existingUser = await users.findByPk(user_id);

    if (!existingUser) {
      return res.status(404).json({
        message: `No se encontraron usuarios con el id: ${user_id}`,
      });
    }

    const fieldsToUpdate = {};

    if (username !== undefined && username.trim() !== existingUser.username.trim()) {
      fieldsToUpdate.username = username.trim();
    }

    if (password !== undefined && password.trim() !== "") {
      fieldsToUpdate.password = password; // Se podría hashear aquí antes de guardar
    }

    if (email !== undefined && email.trim() !== existingUser.email.trim()) {
      fieldsToUpdate.email = email.trim();
    }

    if (type_user !== undefined && parseInt(type_user) !== parseInt(existingUser.type_user)) {
      fieldsToUpdate.type_user = parseInt(type_user);
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(200).json({
        message: "No hay cambios que realizar, los datos son los mismos.",
      });
    }

    await existingUser.update(fieldsToUpdate);

    return res.status(200).json({
      message: `${username || "El usuario"} fue actualizado con éxito`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { users } = db.models;
  const { user_id } = req.params;
  try {
    if (!user_id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    const existingUser = await users.findByPk(user_id);

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: `No se encontraron usuarios con el id: ${user_id}` });
    }

    const newActiveStatus = existingUser.active === true || existingUser.active === 1 ? false : true;

    const updatedUser = await existingUser.update({ active: newActiveStatus });

    if (updatedUser) {
      return res.status(200).json({
        message: `${existingUser.username} ha sido ${newActiveStatus ? 'activado' : 'desactivado'} exitosamente`,
      });
    } else {
      return res.status(500).json({ message: 'No se pudo actualizar el estado del usuario' });
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
