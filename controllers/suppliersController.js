import { Sequelize, Op } from "sequelize";
import db from "../models/index.js";

const createSuppliers = async (req, res) => {
  const { suppliers } = db.models;
  const { nit, name, address, city, phone, email, active } = req.body;

  try {
    if (!name || !nit || address || phone || city || active) {
      return res.status(400).json({ message: "Falta información" });
    }

    const existingSupplier = await suppliers.findOne({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    });

    if (existingSupplier) {
      return res.status(400).json({ message: `${name} ya existe` });
    }

    await suppliers.create({
      nit,
      name,
      address,
      city,
      phone,
      email,
      active,
    });

    return res
      .status(201)
      .json({ message: `El proveedor ${name} fue creado con éxito!` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSuppliers = async (req, res) => {
  const { suppliers, purchases } = db.models;
  try {
    const allSuppliers = await suppliers.findAll({
      include: [{ model: purchases }],
    });

    if (allSuppliers.length === 0) {
      return res.status(404).json({ message: "No se encontraron proveedores" });
    }

    return res.status(200).json(allSuppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSuppliersById = async (req, res) => {
  const { suppliers, purchases } = db.models;
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }
    const supplierById = await suppliers.findByPk(id, {
      include: [{ model: purchases }],
    });

    if (!supplierById) {
      return res
        .status(404)
        .json({ message: `No se encontraron proveedores con el id: ${id}` });
    }

    return res.status(200).json(supplierById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSuppliersByName = async (req, res) => {
  const { suppliers, purchases } = db.models;
  const { name } = req.query;
  try {
    if (!name) {
      return res.status(400).json({ message: "No se envió un nombre" });
    }

    const supplierByName = await suppliers.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      include: [{ model: purchases }],
    });

    if (supplierByName.length === 0) {
      return res.status(404).json({
        message: `No se encontraron proveedores con el nombre: ${name}`,
      });
    }

    return res.status(200).json(supplierByName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editSuppliers = async (req, res) => {
  const { suppliers } = db.models;
  const { id_suppliers, nit, name, address, city, phone, email } = req.body;
  try {
    const existingSupplier = await suppliers.findByPk(id_suppliers);

    if (!existingSupplier) {
      return res.status(404).json({
        message: `No se encontraron proveedores con el id: ${id_suppliers}`,
      });
    }

    if (nit) {
      await existingCustomer.update({ document });
    }

    if (name) {
      await existingCustomer.update({ name });
    }

    if (address) {
      await existingCustomer.update({ address });
    }

    if (city) {
      await existingCustomer.update({ city });
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

const deleteSuppliers = async (req, res) => {
  const { suppliers } = db.models;
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    const existingSupplier = await suppliers.findByPk(id);

    if (!existingSupplier) {
      return res
        .status(404)
        .json({ message: `No se encontraron proveedores con el id: ${id}` });
    }

    if (existingSupplier.active === true) {
      await existingSupplier.update({ active: false });
      return res.status(200).json({
        message: `${existingSupplier.name} fue desactivado exitosamente`,
      });
    } else {
      await existingSupplier.update({ active: true });
      return res.status(200).json({
        message: `${existingSupplier.name} fue activado exitosamente`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const destroySuppliers = async (req, res) => {
  const { suppliers } = db.models;
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    if (isNaN(id)) {
      return res.status(400).json({ message: "Id invalido" });
    }

    const response = await suppliers.findByPk(id);
    await response.destroy();
    return res
      .status(200)
      .json({ message: `${response.name} fue eliminado exitosamente` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createSuppliers,
  getAllSuppliers,
  getSuppliersById,
  getSuppliersByName,
  editSuppliers,
  deleteSuppliers,
  destroySuppliers,
};
