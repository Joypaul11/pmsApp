var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.location = req.body.location;
  user.properties[0] = req.body.properties[0];
  user.user_type = req.body.user_type;
  user.setPassword(req.body.password);
 
 

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    if(!err){
    res.status(200);
    res.json({
      "token" : token,
      "user_type" : user.user_type
    });
  } else {
    res.status(400)
    res.json({
      "msg" : 'User already exists'
    });
  }
  });

};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
  console.log("logging in...");
  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      console.log(user);
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
        "user_type" : user.user_type
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};

  module.exports.adduser = function(req, res) {

    // if(!req.body.name || !req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }
  
    var user = new User();
  
    user.name = req.body.name;
    user.email = req.body.email;
    user.location = req.body.location;
    user.properties[0] = req.body.property;
    user.user_type = 'non-admin';
    user.designation = req.body.designation;
    user.a_userid = req.body.a_userid;
    user.setPassword(req.body.password);
   
   
  
    user.save(function(err) {
      var token;
      token = user.generateJwt();
      if(!err){
      res.status(200);
      res.json({
        "token" : token,
        "user_type" : user.user_type
      });
    } else {
      res.status(400)
      res.json({
        "msg" : 'User already exists'
      });
    }
    });
  
  };


  module.exports.userlist = function(req, res) {

    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }
    console.log("finding user...");
    User
    .find({a_userid: req.body._id})
    .exec(function(err, users) {
      res.status(200).json(users);
    });
  };

