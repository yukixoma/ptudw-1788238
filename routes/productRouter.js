const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const brandController = require("../controllers/brandController");
const colorController = require("../controllers/colorController");
const productController = require("../controllers/productController");
const reviewController = require("../controllers/reviewController");

router.get("/", async (req, res, next) => {
  const { query } = req;
  if (query.category == null || isNaN(query.category)) query.category = 0;
  if (query.brand == null || isNaN(query.brand)) query.brand = 0;
  if (query.color == null || isNaN(query.color)) query.color = 0;
  if (query.min == null || isNaN(query.min)) query.min = 0;
  if (query.max == null || isNaN(query.max)) query.max = 100;
  if (query.sort == null) query.sort = "name";
  if (query.limit == null || isNaN(query.limit)) query.limit = 9;
  if (query.page == null || isNaN(query.page)) query.page = 1;
  if (query.search == null || query.search.trim() == "") query.search = "";

  try {
    res.locals.banner = "Product";
    res.locals.categories = await categoryController.getAll(query);
    res.locals.brands = await brandController.getAll(query);
    res.locals.colors = await colorController.getAll(query);
    res.locals.topProducts = await productController.getTopProduct();
    const productData = await productController.getAll(query);
    res.locals.products = productData.rows;
    res.locals.pagination = {
      page: parseInt(query.page),
      limit: parseInt(query.limit),
      totalRows: productData.count
    };
    res.render("category");
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.locals.banner = "Shop Single";
  res.locals.product = await productController.getById(id);
  res.locals.topProducts = await productController.getTopProduct();
  res.locals.userReview = {};
  const review = await reviewController.getUserReviewProduct(1, id);
  if (review) res.locals.userReview = review;
  else res.locals.userReview.rating = 0;
  res.render("single-product");
});

module.exports = router;
