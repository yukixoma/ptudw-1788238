const controller = {};
const { Category, Product } = require("../models");
const { Op } = require("sequelize");

controller.getAll = async query => {
  const option = {
    attributes: ["id", "name", "imagepath", "summary"],
    include: [{ model: Product, where: {} }]
  };

  if (query && query.search != "")
    option.include[0].where.name = { [Op.iLike]: `%${query.search}%` };

  const data = await Category.findAll(option);
  return data;
};

module.exports = controller;
