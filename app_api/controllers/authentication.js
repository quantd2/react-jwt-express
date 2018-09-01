var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    if(err) {
      sendJSONresponse(res, 404, err);
    } else {
      sendJSONresponse(res, 200, {
        "accessToken": token
      });
    }
  });
};

module.exports.login = function(req, res) {

  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "accessToken": token
      });
    } else {
      // If user is not found
      sendJSONresponse(res, 401, info);
    }
  })(req, res);

};
