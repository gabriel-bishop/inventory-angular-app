const mongoose = require('mongoose');
const schema = require('./product.schema.server');
const productSchema = mongoose.model('ProductModel', schema);
module.exports = productSchema;
