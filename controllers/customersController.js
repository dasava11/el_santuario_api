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
          [Op.like]: name,
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
      include: [{ model: shopping, as: "shoppings" }],
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

    const { id_customers, customers_id } = req.params;
    const id = id_customers || customers_id
    if (!id) {
      return res
        .status(400)
        .json({ message: "No se envió un id y este es requerido." });
    }
    const customerById = await customers.findByPk(id, {
      include: [{ model: shopping, as: "shoppings" }],
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

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ message: "El nombre es requerido y no puede estar vacío." });
    }

    const customerByName = await customers.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      include: [{ model: shopping, as: "shoppings" }],
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
  const {id_customers} = req.params
  const { name, document, phone, email } = req.body;

  try {
    const existingCustomer = await customers.findByPk(id_customers);

    if (!existingCustomer) {
      return res.status(404).json({
        message: `No se encontraron clientes con el id: ${id_customers}`,
      });
    }

    const fieldsToUpdate = {};

    if (name?.trim() && name.trim() !== existingCustomer.name.trim()) {
      fieldsToUpdate.name = name.trim();
    }
    if (
      document !== undefined &&
      String(document).trim() !== String(existingCustomer.document).trim()
    ) {
      fieldsToUpdate.document = document;
    }
    if (
      phone !== undefined &&
      String(phone).trim() !== String(existingCustomer.phone).trim()
    ) {
      fieldsToUpdate.phone = phone;
    }
    if (email?.trim() && email.trim() !== existingCustomer.email.trim()) {
      fieldsToUpdate.email = email.trim();
    }


    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(200).json({
        message: "No hay cambios que realizar, los datos son los mismos.",
      });
    }

    await existingCustomer.update(fieldsToUpdate);

    return res
      .status(200)
      .json({ message: `${name || "El cliente"} fue actualizado con éxito` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// evaluar si es necesario este servicio, de serlo debe añadirse un atributo de active
const deleteCustomer = async (req, res) => {
  const { customers } = db.models;
  const { id_customers } = req.params;
  try {
    if (!id_customers) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    const existingCustomer = await customers.findByPk(id_customers);

    if (!existingCustomer) {
      return res
        .status(404)
        .json({ message: `No se encontraron clientes con el id: ${id}` });
    }

    if (existingCustomer.active === 1) {
      await existingClient.update({ active: 0 });
      return res.status(200).json({
        message: `${existingCustomer.name} fue desactivado exitosamente`,
      });
    } else {
      await existingCustomer.update({ active: 1 });
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
