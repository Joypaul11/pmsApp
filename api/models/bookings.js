var mongoose = require( 'mongoose' );

var bookingHistorySchema = new mongoose.Schema({
  title: {
    type: String
  },
  firstname: {
    type: String,
    required: true
  },
  middlename: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  contact: {
    type: String
  },
  nationality: {
    type: String
  },
  arrival: {
    type: String
  },
  departure: {
    type: String
  },
  adults: {
    type: String
  },
  children: {
    type: String
  },
  bookDate: {
    type: Date,
    required: true
  },
  id: {
    type: Date,
    required: true,
    unique: true
  },
  userid: {
      type: String,
      required: true
  },
  property: {
    type: String,
    required: true
  },
  room_type: {
    type: String,
    required: true
  },
  room_number: {
    type: String,
    required: true
  },
  rate_type: {
    type: String,
  },
  amenity_list: {
    type: [String]
  }
});


mongoose.model('BookingHistory', bookingHistorySchema);
