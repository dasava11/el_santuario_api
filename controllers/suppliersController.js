import { Sequelize, Op } from "sequelize";
import db from "../models/index.js";

const createSuppliers = (req, res) => {
  res.render("suppliers/createSuppliers", {});
};

const getAllSuppliers = (req, res) => {
  res.render("", {});
};

const getSuppliersById = (req, res) => {
  res.render("", {});
};

const getSuppliersByName = (req, res) => {};

const editSuppliers = (req, res) => {
  res.render("", {});
};

const deleteSuppliers = (req, res) => {
  res.render("", {});
};

const destroySuppliers = (req, res) => {
  res.render("", {});
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
