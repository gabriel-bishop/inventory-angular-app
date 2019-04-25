require('../data/db')();
const service = require('./db.service.server');

const dao = require('../daos/db.dao.server');

// service.register({
//   email: "registertest@test.com",
//   password: "test",
//   firstName: "test",
//   lastName: "test",
// }).then(response => console.log(response));


var newUser = {
  _id: 1000,
  username: "TEST",
  password: "TEST",
};

dao.register(newUser)
  .then(response => console.log(response));
