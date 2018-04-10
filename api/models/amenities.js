var mongoose = require( 'mongoose' );

var AmenitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
      type: String,
      required: true
  },
  rate: {
    type: String,
    required: true
  },
  alloted_roomid: {
      type: [String]
  },
  userid: {
      type: String,
      required: true
  }
});


mongoose.model('Amenity', AmenitySchema);
