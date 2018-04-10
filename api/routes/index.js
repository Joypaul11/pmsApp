var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlRooms = require('../controllers/rooms');
var ctrlBookings = require('../controllers/bookings');
var ctrlAmen = require('../controllers/amenities');
// profile
router.get('/profile', auth, ctrlProfile.profileRead);

//user and bookings
router.get('/availability', auth, ctrlRooms.available);
router.post('/allbookings', ctrlBookings.allbookings);

router.post('/bookings', ctrlBookings.bookings);
router.post('/booking/add', ctrlBookings.addSingleBooking);

router.post('/addbooking', ctrlBookings.addbooking);


// admin
router.get('/rooms', auth, ctrlRooms.all);
router.post('/property/add', ctrlProfile.addProperty);
router.post('/rate/add', ctrlProfile.addRate);

router.post('/property/rooms', ctrlRooms.showRooms);
router.post('/rooms/add', ctrlRooms.addRoomSingle);
router.post('/rooms/addsingle', ctrlRooms.addRoom);
router.post('/rooms/add/single', ctrlRooms.addSingleRoom);
router.post('/rooms/update', ctrlRooms.update);
router.post('/rooms/delete', ctrlRooms.delete);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/user/add', ctrlAuth.adduser);
router.post('/user/list', ctrlAuth.userlist);

// amenities
router.get('/amenity/list', auth, ctrlAmen.list);
router.post('/amenity/add', ctrlAmen.add);

module.exports = router;
