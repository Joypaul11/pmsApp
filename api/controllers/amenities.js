var mongoose = require('mongoose');
var Amenity = mongoose.model('Amenity');
var Room = mongoose.model('Room');

module.exports.add = function(req, res) {
    console.log(req.body);
    var amenity = new Amenity();

    amenity.name = req.body.name;
    amenity.description = req.body.description;
    amenity.rate = req.body.rate;
    amenity.userid = req.body.userid;
    amenity.save(function(err, amenity) {
        console.log('in add', err, amenity);
        if (!err)res.status(200).json(amenity);
      });
};

module.exports.list = function(req, res) {
    if (!req.payload._id && !req.payload.a_userid) {
      res.status(401).json({
        "message" : "UnauthorizedError: private profile"
      });
    } else {
      Amenity
      .find({$or: [{userid: req.payload._id}, {userid: req.payload.a_userid}]})
      .exec(function(err, amenities) {
        res.status(200).json(amenities);
      });
    }
  
  };