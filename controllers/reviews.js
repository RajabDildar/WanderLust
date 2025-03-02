const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createNewReview = async (req, res, next) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.createdby = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "Your review created successfully!");
  res.redirect(`/listings/${listing.id}`);
};

module.exports.destroyReview = async (req, res, next) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Your review deleted successfully!");
  res.redirect(`/listings/${id}`);
};
