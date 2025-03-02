const express = require("express");
const router = express.Router({ mergeParams: true }); //by setting merge params to true, we can access parent params in child
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReview,
  isLoggedIn,
  isReviewOwner,
} = require("../middlewares.js");
const reviewController = require("../controllers/reviews.js");

//Reviews post route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createNewReview)
);

//Reviews delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewOwner,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
