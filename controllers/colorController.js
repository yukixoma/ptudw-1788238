const controller = {};
const { Color, ProductColor } = require("../models");

controller.getAll = async () => {
  const data = await Color.findAll({
    include: [{ model: ProductColor }],
    attributes: ["id", "name", "imagepath", "code"]
  });
  return data;
};

module.exports = controller;
