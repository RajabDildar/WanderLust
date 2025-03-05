const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const { string, required } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"], // GeoJSON type
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude] format (GeoJSON standard)
      required: true,
    },
  },
  totalPriceWithTax: {
    type: Number,
  },
});

//deleting all reviews linked with the particular listing
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
