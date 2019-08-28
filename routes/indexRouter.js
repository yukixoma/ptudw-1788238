const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");

router.get("/", async (req, res, next) => {
  try {
    res.locals.categories = await categoryController.getAll();
    res.locals.trendingProducts = await productController.getTrendingProducts();
    res.render("index");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
