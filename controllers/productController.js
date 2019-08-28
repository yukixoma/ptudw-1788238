const controller = {};
const models = require("../models");
const { Product } = models;

controller.getTrendingProducts = async () => {
  const data = await Product.findAll({
    order: [["overallReview", "DESC"]],
    limit: 8,
    include: [{ model: models.Category }],
    attributes: ["id", "name", "imagepath", "price"]
  });
  return data;
};

module.exports = controller;
