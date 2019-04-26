const mongoose = require('mongoose');

const userModel = require('../data/models/user.model.server');
const productModel = require('../data/models/product.model.server');


truncateDatabase = () =>
  // commentsModel.remove();

  productModel.countDocuments().then(
    response => {

      // Only drop if it has any records
      if (response !== 0) {
        mongoose.connection.collections['product'].drop();
      }
    }
  );

populateDatabase = () => {

  const comments = [
    {
      _id: 1002,
      sku: "112192321",
      description: "Cheese wheel",
      quantity: 95,
      userId: 155630519.3732,
      image: "https://www.williams-sonoma.com/wsimgs/rk/images/dp/wcm/201849/0006/full-wheel-of-parmigiano-reggiano-cheese-o.jpg",
      date: 12313123123,
    },
    {
      _id: 555,
      sku: "313190831",
      description: "Coffee Mug",
      quantity: 23213,
      userId: 155630543.4028,
      image: "https://www.notneutral.com/pub/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/l/i/lino_mug_white_1080.jpg",
      date: 38961298,
    }
  ];
  return productModel.insertMany(comments)

  const users = [
    {
      email: 'test',
      password: 'test',
      firstName: 'Hassan',
      lastName: 'K',
      manager: true,
      teams: ['529', '42', '34', '40', '85']
    },
    {
      email: 't',
      password: 't',
      firstName: 'Gabe',
      lastName: 'B',
      manager: true,
      teams: ['170', '42', '80', '40', '50', '537']
    },
    {
      email: 'adi',
      password: 'adi',
      firstName: 'Aditya',
      lastName: 'P',
      manager: false,
      teams: ['42', '80', '40', '50', '728']
    }
  ];

  return userModel.insertMany(users);

};

//////////// User ///////////

register = user =>
  userModel.create(user);

findUserByUsername = username =>
  userModel.findOne({username: username});

updateUser = (userId, user) =>
  userModel.update({_id: userId}, {$set: user});

deleteUser = userId =>
  userModel.remove({_id: userId});

findAllUsers = () =>
  userModel.find();

findUserById = userId =>
  userModel.findById(userId);

findUserByCredentials = (username, password) =>
  userModel.findOne({username: username, password: password});


addProduct = product =>
  productModel.create(product);

findAllProducts = () =>
  productModel.find();

findProductBySku = (sku) =>
  productModel.findOne({sku: sku});

updateProduct = (sku, product) =>
  productModel.update({sku: sku}, {$set: product});



module.exports = {
  truncateDatabase,
  populateDatabase,
  findUserByUsername,
  findUserByCredentials,
  register,
  findAllUsers,
  findUserById,
  updateUser,
  addProduct,
  findAllProducts,
  findProductBySku,
  updateProduct




};
