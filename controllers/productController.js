const controller = {};
const {
  Product,
  ProductSpecification,
  Specification,
  Category,
  Comment,
  User,
  Review
} = require("../models");

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

controller.getTopProduct = async () => {
  const data = await Product.findAll({
    order: [["reviewCount", "DESC"]],
    limit: 12,
    attributes: ["id", "name", "imagepath", "price"]
  });
  const groups = [[], [], [], []];
  let index = -1;
  for (let i = 0; i < data.length; i++) {
    const product = data[i];
    if (i % 3 == 0) index++;
    groups[index].push(product);
  }
  console.log(groups[0]);
  return groups;
};

controller.getById = async id => {
  const product = await Product.findOne({
    include: [{ model: Category }],
    where: { id: id }
  });
  product.ProductSpecifications = await ProductSpecification.findAll({
    include: [{ model: Specification }],
    where: { productId: id }
  });
  product.Comments = await Comment.findAll({
    include: [
      { model: User },
      { model: Comment, as: "SubComments", include: [{ model: User }] }
    ],
    where: { productId: id, parentCommentId: null }
  });
  product.Reviews = await Review.findAll({
    include: [{ model: User }],
    where: { productId: id }
  });
  product.Stars = [];
  for (let i = 1; i < 6; i++) {
    product.Stars.push(product.Reviews.filter(item => item.rating == i).length);
  }

  return product;
};

module.exports = controller;
