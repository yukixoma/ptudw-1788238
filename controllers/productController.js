const controller = {};
const {
  Product,
  ProductSpecification,
  Specification,
  Category,
  Comment,
  User,
  Review,
  ProductColor
} = require("../models");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

controller.getAll = async query => {
  const option = {
    include: [{ model: Category }],
    attributes: ["id", "name", "imagepath", "price"],
    where: {
      price: {
        [Op.gte]: query.min,
        [Op.lte]: query.max
      }
    }
  };
  if (query.category > 0) option.where.categoryId = query.category;

  if (query.search != "")
    option.where.name = { [Op.iLike]: `%${query.search}%` };

  if (query.brand > 0) option.where.brandId = query.brand;

  if (query.color > 0)
    option.include.push({
      model: ProductColor,
      attributes: [],
      where: { colorId: query.color }
    });

  if (query.limit > 0) {
    option.limit = query.limit;
    option.offset = query.limit * (query.page - 1);
  }

  if (query.sort) {
    switch (query.sort) {
      case "name":
        option.order = [["name", "ASC"]];
        break;
      case "price":
        option.order = [["price", "ASC"]];
        break;
      case "overallReview":
        option.order = [["overallReview", "DESC"]];
        break;

      default:
        option.order = [["name", "ASC"]];
        break;
    }
  }

  const data = await Product.findAndCountAll(option);
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
