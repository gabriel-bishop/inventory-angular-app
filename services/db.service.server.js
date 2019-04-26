const dao = require('../daos/db.dao.server');

module.exports = app => {

  let populateDatabase = (req, res) => {
    dao.populateDatabase();
    res.send('DB Populated!');
  };

  let findUserByCredentials = (req, res) => {
    dao.findUserByCredentials(req.body['username'], req.body['password'])
      .then(response => res.json(response))
  }

  let truncateDatabase = (req, res) => {
    dao.truncateDatabase();
    res.send("DB Truncated!");
  };

  let findAllUsers = (req, res) => {
    dao.findAllUsers()
      .then(response => res.json(response));
  };

  let findAllProducts = (req, res) => {
    dao.findAllProducts()
      .then(response => res.json(response));
  };

  let findUsersByTeam = (req, res) => {
    dao.findUserByTeam(req.params['tid'])
      .then(response => res.json(response));
  };

  let populateLogos = (req, res) => {
    logoDao.populateLogos();
    res.send("Logos Populated!");
  };

  let findLogoUrlByTeam = (req, res) => {
    logoDao.findLogoUrlByTeam(req.params['tid'])
      .then(response => res.json(response[0]['logoUrl']));
  };

  let findLogoUrlByLeague = (req, res) => {
    logoDao.findLogoUrlByLeague(req.params['lid'])
      .then(response => res.json(response[0]['logoUrl']));
  };

  let truncateLogos = (req, res) => {
    logoDao.truncateLogos();
    res.send("Logos Truncated!");
  };

  let findAllLogos = (req, res) => {
    logoDao.findAllLogos()
      .then(response => res.json(response));
  };

  function register(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var id = req.body._id;

    if (username == null || password == null){
      return null;
    }

    var newUser = {
      _id: id,
      username: username,
      password: password
    };

    dao.findUserByUsername(newUser.username)
      .then(function (user) {
        if (!user) {
          return dao.register(newUser);
        }
      })
      .then(function (user) {
        req.session['currentUser'] = user;
        res.send(user);
      });
  }

  function login(req, res) {
    var password = req.body.password;
    var username = req.body.username;
    dao.findUserByCredentials(username, password)
      .then(function (user) {
        if(user) {
          req.session['currentUser'] = user;
          res.send(user);
        } else {
          res.send(null);}});
  }

  function updateUser(req, res) {
    dao.updateUser(req.params['uid'], req.body)
      .then(response => {
        res.json(response);
      });

    // must update session aswell
    req.session['currentUser'] = req.body;
  }

  function logout(req, res) {
    req.session.cookie.expires = new Date().getTime();
    req.session.destroy();
    res.send({status: "Logged out"});
  }

  function getLoggedInUser(req, res){
    if(req.session['currentUser']){
      res.send(req.session['currentUser']);

    }else{
      res.send(null);
    }

  }

  function findUserById(req, res) {
    dao.findUserById(req.params['uid'])
      .then(response => {
        res.json(response)
      });
  }

  function createProduct(req, res) {
    dao.addProduct(req.body)
      .then(response => {
        res.json(response)
      })
  }

  function findProductBySku(req, res) {
    dao.findProductBySku(req.params['sku'])
      .then(response => {
        res.json(response)
      });
  }

  function updateProduct(req, res) {
    dao.updateProduct(req.params['sku'], req.body)
      .then(response => {
        res.json(response);
      });
  }

  // Logos
  app.post('/api/logo/team/:tid', findLogoUrlByTeam);
  app.post('/api/logo/league/:lid', findLogoUrlByLeague);
  app.post('/api/populate_logos', populateLogos);
  app.delete('/api/logo/delete', truncateLogos);
  app.post('/api/logo', findAllLogos);
  app.post('/api/populate', populateDatabase);
  app.post('/api/user', findAllUsers);
  app.post('/api/user/team/:tid', findUsersByTeam);
  app.post('/api/user/login', findUserByCredentials);
  app.delete('/api/all', truncateDatabase);
  app.post('/api/register', register);
  app.put('/api/user/:uid', updateUser);
  app.post('/api/currentUser', getLoggedInUser);
  app.post('/api/logout', logout);
  app.post('/api/login', login);
  app.post('/api/user/:uid', findUserById);
  app.post('/api/newproduct', createProduct);
  app.post('/api/product', findAllProducts);
  app.post('/api/product/:sku', findProductBySku);
  app.put('/api/product/:sku', updateProduct);



};
