const controller = {};
const { Brand, Product } = require("../models");

controller.getAll = async () => {
  const data = await Brand.findAll({
    include: [{ model: Product }],
    attributes: ["id", "name", "imagepath"]
  });
  return data;
};

module.exports = controller;
