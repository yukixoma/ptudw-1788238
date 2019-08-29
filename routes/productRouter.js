const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const brandController = require("../controllers/brandController");
const colorController = require("../controllers/colorController");
const productController = require("../controllers/productController");

router.get("/", async (req, res, next) => {
  try {
    res.locals.categories = await categoryController.getAll();
    res.locals.brands = await brandController.getAll();
    res.locals.colors = await colorController.getAll();
    res.locals.products = await productController.getAll();
    res.render("category");
  } catch (error) {
    next(error);
  }
});

router.get("/:id", (req, res) => {
  res.render("single-product");
});

module.exports = router;
