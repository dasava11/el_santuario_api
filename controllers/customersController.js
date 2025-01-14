import { Sequelize, Op } from "sequelize";
import db from "../models/index.js";

const createCustomer = async (req, res) => {
  const { customers } = db.models;
  const { name, document, phone, email } = req.body;
  try {
    if (!name || !document) {
      return res.status(400).json({ message: "Falta información" });
    }

    const existingClient = await customers.findOne({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    });

    if (existingClient) {
      return res.status(400).json({ message: `${name} ya existe` });
    }

    await customers.create({
      name,
      document,
      phone,
      email,
    });

    return res.status(201).json({ message: `${name} fue creado con éxito!` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCustomers = async (req, res) => {
  const { customers, shopping } = db.models;
  try {
    const clients = await customers.findAll({
      include: [{ model: shopping }],
    });

    if (clients.length === 0) {
      return res.status(404).json({ message: "No se encontraron clientes" });
    }

    return res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCustomerById = async (req, res) => {
  const { customers, shopping } = db.models;
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }
    const customerById = await customers.findByPk(id, {
      include: [{ model: shopping }],
    });

    if (!customerById) {
      return res
        .status(404)
        .json({ message: `No se encontraron clientes con el id: ${id}` });
    }

    return res.status(200).json(customerById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCustomerByName = async (req, res) => {
  const { customers, shopping } = db.models;
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "No se envió un nombre" });
    }

    const customerByName = await customers.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      include: [{ model: shopping }],
    });

    if (customerByName.length === 0) {
      return res
        .status(404)
        .json({ message: `No se encontraron clientes con el nombre: ${name}` });
    }

    return res.status(200).json(customerByName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editCustomer = async (req, res) => {
  const { customers } = db.models;
  const { id_customers, name, document, phone, email } = req.body;
  try {
    const existingCustomer = await customers.findByPk(id_customers);

    if (!existingCustomer) {
      return res.status(404).json({
        message: `No se encontraron clientes con el id: ${id_customers}`,
      });
    }

    if (name) {
      await existingCustomer.update({ name });
    }

    if (document) {
      await existingCustomer.update({ document });
    }

    if (phone) {
      await existingCustomer.update({ phone });
    }

    if (email) {
      await existingCustomer.update({ email });
    }

    return res
      .status(200)
      .json({ message: `${name} fue actualizado con éxito` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// evaluar si es necesario este servicio, de serlo debe añadirse un atributo de active
const deleteCustomer = async (req, res) => {
  const { customers } = db.models;
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    const existingCustomer = await customers.findByPk(id);

    if (!existingCustomer) {
      return res
        .status(404)
        .json({ message: `No se encontraron clientes con el id: ${id}` });
    }

    if (existingCustomer.active === true) {
      await existingClient.update({ active: false });
      return res.status(200).json({
        message: `${existingCustomer.name} fue desactivado exitosamente`,
      });
    } else {
      await existingCustomer.update({ active: true });
      return res.status(200).json({
        message: `${existingCustomer.name} fue activado exitosamente`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomerByName,
  editCustomer,
  deleteCustomer,
};
