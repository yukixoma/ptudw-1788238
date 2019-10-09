const express = require("express");
const router = express.Router();
const controller = require("../controllers/reviewController");

router.post("/", async (req, res, next) => {
  const { productId, rating, message } = req.body;
  const review = {
    userId: 1,
    productId: productId,
    rating: rating,
    message: message
  };
  try {
    await controller.add(review);
    res.redirect(`/products/${productId}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
