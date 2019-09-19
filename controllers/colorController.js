const controller = {};
const { Color, ProductColor, Product } = require("../models");
const { Op } = require("sequelize");

controller.getAll = async query => {
  const option = {
    attributes: ["id", "name", "imagepath", "code"],
    include: [
      {
        model: ProductColor,
        include: [
          {
            model: Product,
            attributes: [],
            where: {
              price: {
                [Op.gte]: query.min,
                [Op.lte]: query.max
              }
            }
          }
        ]
      }
    ]
  };

  if (query.category > 0)
    option.include[0].include[0].where.categoryId = query.category;

  if (query.search != "")
    option.include[0].include[0].where.name = {
      [Op.iLike]: `%${query.search}%`
    };

  if (query.brand > 0) option.include[0].include[0].where.brandId = query.brand;

  const data = await Color.findAll(option);
  return data;
};

module.exports = controller;
