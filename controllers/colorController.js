const controller = {};
const { Color, ProductColor, Product } = require("../models");

controller.getAll = async query => {
  const option = {
    include: [
      {
        model: ProductColor,
        include: [{ model: Product, attributes: [], where: {} }]
      }
    ],
    attributes: ["id", "name", "imagepath", "code"]
  };
  if (query.category > 0)
    option.include[0].include[0].where.categoryId = query.category;
  if (query.brand > 0) option.include[0].include[0].where.brandId = query.brand;
  const data = await Color.findAll(option);
  return data;
};

module.exports = controller;
