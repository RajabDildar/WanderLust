const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing");

// validating listing schema
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//home route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

//new route
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

//create route
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New listing created successfully!");
    res.redirect("/listings");
  })
);

//show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist.");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  })
);

//edit route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist.");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  })
);

//update route
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    if (!req.body.listing) {
      throw new ExpressError(400, "Bad request, Please send valid data...");
    }
    await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { runValidators: true }
    );
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
  })
);

//delete route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
  })
);

module.exports = router;
