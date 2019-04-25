const mongoose = require('mongoose');

const userModel = require('../data/models/user.model.server');
const productModel = require('../data/models/product.model.server');


truncateDatabase = () =>
  // commentsModel.remove();

  userModel.countDocuments().then(
    response => {

      // Only drop if it has any records
      if (response !== 0) {
        mongoose.connection.collections['user'].drop();
      }
    }
  );

populateDatabase = () => {

  // const comments = [
  //   {
  //     userId: 1,
  //     username: 'John',
  //     comment: 'This is a comment!'
  //   },
  //   {
  //     userId: 2,
  //     username: 'Jane',
  //     comment: 'This is another comment!'
  //   },
  //   {
  //     userId: 3,
  //     username: 'Alice',
  //     comment: 'This is yet another comment!'
  //   }
  // ];
  // return commentsModel.insertMany(comments)

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
  findAllProducts




};
