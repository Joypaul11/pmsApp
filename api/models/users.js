var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var aRoomSchema = new mongoose.Schema({
  booking_status: String,
  housekeeping_status: String,
});

var roomGroupSchema = new mongoose.Schema({
  name: {type: String, default: 'Normal'},
  total_number: {type: Number, default: 0},

});

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  a_userid: {
    type: String
  }, 
  designation: {
    type: String
  },
  user_type: {
    type: String
  },
  properties: {
    type: [String],
  },
  rates: {
    type: [String],
  },
  hash: String,
  salt: String
}, { usePushEach: true });

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    user_type: this.user_type,
    a_userid: this.a_userid,
    properties: this.properties,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);
