const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", async (req, res) => {
  const { cart } = req.session;
  res.locals.cart = cart.getCart();
  res.render("cart");
});

router.post("/", async (req, res, next) => {
  const { body } = req;
  const productId = body.id;
  const quantity = isNaN(body.quantity) ? 1 : body.quantity;
  try {
    const product = await productController.getById(productId);
    const cardItem = req.session.cart.add(product, productId, quantity);
    res.json(cardItem);
  } catch (error) {
    next(error);
  }
});

router.put("/", (req, res) => {
  const productId = req.body.id;
  const quantity = parseInt(req.body.quantity);
  const cartItem = req.session.cart.update(productId, quantity);
  res.json(cartItem);
});

router.delete("/", (req, res) => {
  const productId = req.body.id;
  req.session.cart.remove(productId);
  res.status(201).send("Item remove");
});

router.delete("/all", (req, res) => {
  req.session.cart.empty();
  res.status(204).send("Cart is emptied!");
});

module.exports = router;
