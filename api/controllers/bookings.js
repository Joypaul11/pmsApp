var mongoose = require('mongoose');
var BookingHistory = mongoose.model('BookingHistory');
var Room = mongoose.model('Room');

module.exports.addSingleBooking = function(req, res) {
  var booking = new BookingHistory();

  booking.title = req.body.title;
  booking.firstname = req.body.firstname;
  booking.middlename = req.body.middlenamename;
  booking.email = req.body.email;
  booking.contact = req.body.contact;
  booking.userid = req.body.userid;
  booking.arrival = req.body.arrival;
  booking.departure = req.body.departure;
  booking.adults = req.body.adults;
  booking.property = req.body.property;
  booking.room_type = req.body.room_type;
  booking.rate_type = req.body.rate_type;
  booking.id = new Date().getTime();
  booking.bookDate = new Date().getTime();
  booking.room_number = req.body.room_number;
  Room
  .find({room_name: req.body.room_type})
  .where({property: req.body.property})
  .exec(function(err, room){
   
    if(err) {
      res.status(404).json({"msg": "Room not found"});
    }
  if(room[0].no_of_rooms > 0){
      //room[0].no_of_rooms = parseInt(room[0].no_of_rooms) - 1;
      for (var j = 0; j < room[0].room_numbers.length; j++) {
        if(room[0].room_numbers[j] == req.body.room_number) {
          
          //room[0].room_numbers.splice(j, 1);
        }
      }
      room[0].save(function(err, record) {
          if (!err){
              booking.save(function(err, booker) {
                  console.log('in add', err, booking);
                  if (!err)res.status(200).json(booker);
                });
          }
      });
      
    }
    if(room[0].no_of_rooms <= 0){
      res.status(404).json({"msg": "Room has no available beds"});
    }
  });
}

module.exports.addbooking = function(req, res) {
 
  var booking = new BookingHistory();

  booking.email = req.body.email;
  booking.userid = req.body.userid;
  booking.bookStartDate = req.body.bookStartDate;
  booking.bookEndDate = req.body.bookEndDate;
  booking.name = req.body.name;
  booking.property = req.body.property;
  booking.room_name = req.body.room_name;
  booking.id = new Date().getTime();
  booking.bookDate = new Date().getTime();
  booking.room_number = req.body.room_number;
  Room
  .find({name: req.body.room_name})
  .where({property: req.body.property})
  .exec(function(err, room){
   
    if(err) {
      res.status(404).json({"msg": "Room not found"});
    }
  if(room[0].no_of_rooms > 0){
      room[0].no_of_rooms = parseInt(room[0].no_of_rooms) - 1;
      for (var j = 0; j < room[0].room_numbers.length; j++) {
        if(room[0].room_numbers[j] == req.body.room_number) {
          
          // room[0].room_numbers.splice(j, 1);
        }
      }
      room[0].save(function(err, record) {
          if (!err){
              booking.save(function(err, booker) {
                  console.log('in add', err, booking);
                  if (!err)res.status(200).json(booker);
                });
          }
      });
      
    }
    if(room[0].no_of_rooms <= 0){
      res.status(404).json({"msg": "Room has no available beds"});
    }
  });

  /*
  Room
  .find({"name": req.body.room_name})
  .where({"property": booking.property})
  .exec( function (err, room) {
    console.log(room);
      if(err) {
        res.status(404).json({"msg": "Room not found"});
      }
      console.log('rooooooooooooooo', room);
    if(room[0].beds > 0){
        room[0].beds = parseInt(room.beds) - 1;
        room[0].save(function(err, record) {
            console.log('in add', err, room);
            if (!err){
                booking.save(function(err, booker) {
                    console.log('in add', err, booking);
                    if (!err)res.status(200).json(booker);
                  });
            }
        });
        
      }
      if(room[0].beds <= 0){
        res.status(404).json({"msg": "Room found with no available beds"});
      }
  });
  
  */

};



module.exports.bookings = function(req, res) {
    BookingHistory
    .find({email: req.body.email}, {userid: req.body.userid})
    .exec(function(err, bookings) {
      res.status(200).json(bookings);
    });
  };

module.exports.allbookings = function(req, res) {
    BookingHistory
    .find({userid: req.body.userid})
    .where({property: req.body.property})
    .exec(function(err, bookings) {
        res.status(200).json(bookings);
    })
};
