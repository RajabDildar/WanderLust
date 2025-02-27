const express = require("express");
const router = express.Router({ mergeParams: true }); //by setting merge params to true, we can access parent params in child
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review");
const Listing = require("../models/listing");
const {
  validateReview,
  isLoggedIn,
  isReviewOwner,
} = require("../middlewares.js");

//Reviews post route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.createdby = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Your review created successfully!");
    res.redirect(`/listings/${listing.id}`);
  })
);

//Reviews delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewOwner,
  wrapAsync(async (req, res, next) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Your review deleted successfully!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
