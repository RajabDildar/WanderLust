const joi = require("joi"); //joi is npm package used for schema validations in javascript
// reference website => https://joi.dev/api/?v=17.13.3

module.exports.listingSchema = joi.object({
  listing: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required(),
      location: joi.string().required(),
      country: joi.string().required(),
      price: joi.number().required().min(0),
      image: joi.string().allow("", null),
    })
    .required(),
});
