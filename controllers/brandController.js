const controller = {};
const { Brand, Product, ProductColor } = require("../models");

controller.getAll = async query => {
  const option = {
    include: [{ model: Product, attributes: ["id"], where: {} }],
    attributes: ["id", "name", "imagepath"]
  };
  if (query.category > 0) option.include[0].where.categoryId = query.category;
  if (query.color > 0)
    option.include[0].include = [
      {
        model: ProductColor,
        attributes: [],
        where: { colorId: query.color }
      }
    ];
  const data = await Brand.findAll(option);
  return data;
};

module.exports = controller;
