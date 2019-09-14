const controller = {};
const { Category, Product } = require("../models");

controller.getAll = async () => {
  const data = await Category.findAll({
    include: [{ model: Product }],
    attributes: ["id", "name", "imagepath", "summary"]
  });
  return data;
};

module.exports = controller;