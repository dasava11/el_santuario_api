import { Sequelize, Op } from "sequelize";
import db from "../models/index.js";

const getAllCustomers = async (req, res) => {
  const { customers, shopping } = db.models;

  try {
    const clients = await customers.findAll({ include: { model: shopping } });
    if (clients.length === 0) {
      return res.status(404).json({ message: "No se encontraron clientes" });
    }

    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCustomerById = async (req, res) => {
  const { id } = req.params;
  const { customers, shopping } = db.models;
  try {
    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    const clientById = await customers.findByPk(id, {
      include: { model: shopping },
    });

    if (!clientById) {
      return res
        .status(404)
        .json({ message: `No se encontraron clientes con el id: ${id}` });
    }

    return res.status(200).json(clientById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCustomerByName = async (req, res) => {
  const { name } = req.query;
  const { customers, shopping } = db.models;
  try {
    if (!name) {
      return res.status(400).json({ message: "No se envió un nombre" });
    }

    const clientByName = await customers.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      include: { model: shopping },
    });

    if (clientByName.length === 0) {
      return res
        .status(404)
        .json({ message: `No se encontraron clientes con el nombre: ${name}` });
    }

    return res.status(200).json(clientByName);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createCustomer = async (req, res) => {
  const { customers } = db.models;
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editCustomer = async (req, res) => {
  const { customers } = db.models;
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  const { customers } = db.models;
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const destroyCustomer = async (req, res) => {
  const { customers } = db.models;
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomerByName,
  editCustomer,
  deleteCustomer,
  destroyCustomer,
};
