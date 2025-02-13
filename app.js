const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./models/listing");
const Review = require("./models/review");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");

//setting ejs as view engine and setting ejs-mate
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);

//parsing data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static files path
app.use(express.static(path.join(__dirname, "/public")));

//method overriding
app.use(methodOverride("_method"));

//connecting with mongodb
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const main = async () => {
  await mongoose.connect(MONGO_URL);
};

main()
  .then((res) => console.log("connected with db"))
  .catch((err) => console.log(err));

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

// validating review schema
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//creating routes
app.get("/", (req, res) => {
  res.redirect("/listings");
});

//home route
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

//new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//create route
app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  })
);

//show route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  })
);

//edit route
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

//update route
app.put(
  "/listings/:id",
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
    res.redirect(`/listings/${id}`);
  })
);

//delete route
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

//Reviews
//Reviews post route
app.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing.id}`);
  })
);

//Reviews delete route
app.delete(
  "/listings/:id/reviews/:reviewId",
  wrapAsync(async (req, res, next) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

//starting server
app.listen(3000, () => console.log("server is listening"));
