const controller = {};
const { Product, Category } = require("../models");

controller.getAll = async () => {
  const data = await Product.findAll({
    include: [{ model: Category }],
    attributes: ["id", "name", "imagepath", "price"]
  });
  return data;
};

controller.getTrendingProducts = async () => {
  const data = await Product.findAll({
    order: [["overallReview", "DESC"]],
    limit: 8,
    include: [{ model: Category }],
    attributes: ["id", "name", "imagepath", "price"]
  });
  return data;
};

module.exports = controller;
