module.exports = function () {
  const mongoose = require('mongoose');
  //const databaseName = 'soccer-tracker';
  //var connectionString = 'mongodb://localhost/';
  let connectionString = 'mongodb://heroku_0jq6t1kc:i6fk3gthkdp5mqlknvf8dcj9kp@ds145356.mlab.com:45356/heroku_0jq6t1kc';

  //connectionString += databaseName;
  mongoose.connect('mongodb://heroku_bw3lm08k:8bkt0f4rtdq6h87m2691qsmbrg@ds147446.mlab.com:47446/heroku_bw3lm08k');
};
