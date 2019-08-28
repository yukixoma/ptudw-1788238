const controller = {};
const models = require("../models");
const { Category } = models;

controller.getAll = async () => {
  const data = await Category.findAll({
    attributes: ["id", "name", "imagepath", "summary"]
  });
  return data;
};

module.exports = controller;
