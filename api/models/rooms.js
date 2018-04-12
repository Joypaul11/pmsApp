
var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var rateSchema = new mongoose.Schema({
  rate_type: String,
  rate_value: String,
  vat_rate: String
})

var roomSchema = new mongoose.Schema({
  room_name: {
    type: String,
    required: true
  },
  room_numbers: {
    type: [Number],
  },
  base_price: {
    type: Number,
    required: true
  },
  ex_person_charge: {
    type: Number,
    required: true
  },
  ex_bed_charge: {
    type: Number,
    required: true
  },
  no_of_rooms: {
    type: Number,
    required: true
  },
  occup_base: {
    type: Number,
    required: true
  },
  occup_max: {
    type: Number,
    required: true
  },
  occup_ex_beds: {
    type: Number,
    required: true
  },
  userid: {
    type: String,
    required: true
  },
  property: {
    type: String,
    required: true
  },
  amenity_list: {
    type: [String]
  },
  rates: [rateSchema]
  
});


mongoose.model('Room', roomSchema);
