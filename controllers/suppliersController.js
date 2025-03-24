import { Sequelize, Op } from "sequelize";
import db from "../models/index.js";

const createSuppliers = async (req, res) => {
  const { suppliers } = db.models;
  const { nit, name, address, city, phone, email, active } = req.body;

  try {
    if (!name || !nit || !address || !phone || !city || active === undefined) {
      return res.status(400).json({ message: "Falta información requerida" });
    }

    const existingSupplier = await suppliers.findOne({
      where: {
        name: {
          [Op.like]: name,
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
      include: [{ model: purchases, as: "purchases" }],
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
  const { supplier_id, id_supplier } = req.params;
  const id = supplier_id || id_supplier
  try {
    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }
    const supplierById = await suppliers.findByPk(id, {
      include: [{ model: purchases, as: "purchases" }],
    });

    if (!supplierById) {
      return res
        .status(404)
        .json({
          message: `No se encontraron proveedores con el id: ${supplier_id}`,
        });
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
    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ message: "El nombre es requerido y no puede estar vacío." });
    }

    const supplierByName = await suppliers.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      include: [{ model: purchases, as: "purchases" }],
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
  const { supplier_id } = req.params;
  const { nit, name, address, city, phone, email } = req.body;

  try {
    const existingSupplier = await suppliers.findByPk(supplier_id);

    if (!existingSupplier) {
      return res.status(404).json({
        message: `No se encontraron proveedores con el id: ${supplier_id}`,
      });
    }

    const fieldsToUpdate = {};

    if (nit !== undefined && nit !== existingSupplier.nit) {
      fieldsToUpdate.nit = nit;
    }
    if (name !== undefined && name !== existingSupplier.name) {
      fieldsToUpdate.name = name;
    }
    if (address !== undefined && address !== existingSupplier.address) {
      fieldsToUpdate.address = address;
    }
    if (city !== undefined && city !== existingSupplier.city) {
      fieldsToUpdate.city = city;
    }
    if (phone !== undefined && phone !== existingSupplier.phone) {
      fieldsToUpdate.phone = phone;
    }
    if (email !== undefined && email !== existingSupplier.email) {
      fieldsToUpdate.email = email;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(200).json({
        message: "No hay cambios que realizar, los datos son los mismos.",
      });
    }

    await existingSupplier.update(fieldsToUpdate);

    return res
      .status(200)
      .json({ message: `${name || "El proveedor"} fue actualizado con éxito` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSuppliers = async (req, res) => {
  const { suppliers } = db.models;
  const { supplier_id } = req.params;
  try {
    if (!supplier_id) {
      return res
        .status(400)
        .json({ message: "No se envió un id y este es requerido." });
    }

    const existingSupplier = await suppliers.findByPk(supplier_id);

    if (!existingSupplier) {
      return res
        .status(404)
        .json({
          message: `No se encontraron proveedores con el id: ${supplier_id}`,
        });
    }

    if (existingSupplier.active === 1) {
      await existingSupplier.update({ active: 0 });
      return res.status(200).json({
        message: `${existingSupplier.name} fue desactivado exitosamente`,
      });
    } else {
      await existingSupplier.update({ active: 1 });
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
  const { supplier_id } = req.params;
  try {
    if (!supplier_id) {
      return res
        .status(400)
        .json({ message: "No se envió un id y este es requerido." });
    }

    if (isNaN(supplier_id)) {
      return res.status(400).json({ message: "Id invalido" });
    }

    const response = await suppliers.findByPk(supplier_id);
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
