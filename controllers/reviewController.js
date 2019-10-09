const controller = {};
const { Review, Product } = require("../models");

controller.add = async review => {
  const { productId, userId } = review;
  const preReview = await Review.findOne({
    where: {
      userId: userId,
      productId: productId
    }
  });
  if (preReview) {
    await Review.update(review, {
      where: {
        userId: userId,
        productId: productId
      }
    });
  } else {
    await Review.create(review);
  }
  // update product overall
  const product = await Product.findOne({
    where: { id: productId },
    include: [{ model: Review }]
  });
  let totalReview = 0;
  for (let i = 0; i < product.Reviews.length; i++) {
    totalReview += product.Reviews[i].rating;
  }
  overallReview = totalReview / product.Reviews.length;
  await Product.update(
    {
      overallReview: overallReview,
      reviewCount: product.Reviews.length
    },
    {
      where: { id: productId }
    }
  );
};

controller.getUserReviewProduct = async (userId, productId) => {
  const review = await Review.findOne({
    where: {
      userId,
      productId
    }
  });
  return review;
};

module.exports = controller;
