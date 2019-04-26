const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
  _id: {type: Number, required: true},
  image: String,
  description: String,
  sku: String,
  quantity: Number,
  date: Number,
  userId: {type: mongoose.Schema.Types.Number, ref: 'UserModel'},
  fields: {}

}, {collection: 'product'});
module.exports = productSchema;
