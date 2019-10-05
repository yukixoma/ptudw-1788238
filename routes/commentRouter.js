const express = require("express");
const router = express.Router();
const controller = require("../controllers/commentController");

router.post("/", async (req, res, next) => {
  const { productId, message, parentCommentId } = req.body;
  const comment = {
    userId: 1,
    productId: productId,
    message: message
  };

  if (!isNaN(parentCommentId) && parentCommentId) {
    comment.parentCommentId = parentCommentId;
  }
  try {
    const data = await controller.add(comment);
    res.redirect(`/products/${productId}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
