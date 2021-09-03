// ASYNC
const async = require('async');
// MODEL
const User = require('../model/user');

// MIDDLEWARE
const { generateToken } = require('../utils/generateToken');

// REGISTER NEW USER
exports.registerNewUser = function (req, res, callback) {
  async.waterfall(
    [
      function (callback) {
        const { name, mobile } = req.body;
        // CHECKING USER EXISTENCE
        User.findOne({ mobile: mobile }, function (err, userexist) {
          if (err) {
            callback(err);
          } else {
            if (userexist) {
              callback('user exist');
            } else {
              // CREATING USER
              User.create(req.body, function (err, user) {
                if (err) {
                  callback(err);
                } else {
                  let userdata = { user, token: generateToken(user._id) }; // GENERATE TOKEN
                  callback(null, userdata);
                }
              });
            }
          }
        });
      },
    ],
    function (err, result) {
      if (err) {
        callback(err);
      } else {
        res.send(result);
      }
    }
  );
};

// LOGIN USER

exports.loginUser = function (req, res, callback) {
  async.waterfall(
    [
      function (callback) {
        const { mobile } = req.body;
        User.findOne({ mobile: mobile }, function (err, user) {
          if (err) {
            callback(err);
          } else {
            if (!user) {
              callback(null, 'user does not exist');
            } else {
              let userdata = { user, token: generateToken(user._id) }; // GENERATE TOKEN
              callback(null, userdata);
            }
          }
        });
      },
    ],
    function (err, result) {
      if (err) {
        callback(err);
      } else {
        res.send(result);
      }
    }
  );
};
