const Listing = require("../models/listing.js");

module.exports.searchListings = async (req, res) => {
  let { country } = req.body;
  let allListings = await Listing.find({ country: new RegExp(country, "i") });
  if (!allListings.length) {
    req.flash("error", "Sorry! No stay found at your requested location.");
    return res.redirect("/listings");
  }
  res.render("listings/index.ejs", { allListings });
};

module.exports.searchListingsByCategory = async (req, res) => {
  let { category } = req.params;
  let allListings = await Listing.find({ category });
  if (!allListings.length) {
    req.flash("error", "Sorry! No stay found at this filter.");
    return res.redirect("/listings");
  }
  res.render("listings/index.ejs", { allListings });
};
