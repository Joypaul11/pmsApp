var mongoose = require('mongoose');
var Room = mongoose.model('Room');
var async = require('async');



module.exports.all = function(req, res) {
  if (!req.payload._id && !req.payload.a_userid) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Room
    .find({$or: [{userid: req.payload._id}, {userid: req.payload.a_userid}]})
    .exec(function(err, rooms) {
      res.status(200).json(rooms);
    });
  }

};

module.exports.available = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Room
    .find({userid: req.payload._id})
    .exec(function(err, rooms) {
      res.status(200).json(rooms);
    });
  }

};

module.exports.showRooms = function(req, res) {
  console.log('Body' + JSON.stringify(req.body));
  if(!req.body.userid && !req.body.a_userid) {
    res.status(401).json({
      "message": "UnauthorizedError: Private Profile"
    });
  } else {
    Room
    .find({$or: [{userid: req.body.userid}, {userid: req.body.a_userid}]})
    .where({property: req.body.property_name})
    .exec(function(err, rooms){
      res.status(200).json(rooms);
    });
  }
}

module.exports.addRoomSingle = function(req, res) {
  console.log(req.body);
  
  const room = req.body;

    var roomer = new Room(room);

    roomer.save(function (err) {
      console.log(err) // #sadpanda
    });
  
  
 res.status(200).json({"Success:": "Rooms Added Successfully"});
}

module.exports.addSingleRoom = function(req, res) {
  console.log(parseInt(req.body.room_number));
  if(!req.body.user_id) {
    res.status(401).json({
      "message": "UnauthorizedError: Private Profile"
    });
  } else {
    
    Room.update(
      { userid: req.body.user_id, room_name: req.body.room_type },
      { $push: { room_numbers: req.body.room_number } },
      function (err, foo) {
        if (err){
          console.log(err);
        }
        else {
          res.status(200).json({
            "message": "Room added successfully"
          });
        }
      }
   )

    //Room.where({ userid: req.body.user_id }, {room_name: req.body.room_type}).update({ $push: { room_numbers:  req.body.room_number.parseInt()}});      
 
  
}
}

module.exports.addRoom = function(req, res) {
  console.log(req.body.rooms);
  
  const rooms = req.body.rooms;
  /*
  let hun = 100;
  for (room of rooms ) {
    room.room_numbers = [];
    for ( let i=0; i<room.no_of_rooms; i++ ) {
      room.room_numbers.push(hun + i);
    }
    hun += 100;


  }

  async.each(rooms, function (photoData, callback) {
    var roomer = new Room(room);
    roomer.save(function(err, item){
      if (err){
        console.log(err);
      }

      console.log('Saved', item);
      callback();
    });
  }, function (error) {
    if (error) res.json(500, {error: error});
  
    console.log('Rooms saved');
    return res.json(200, {msg: 'Rooms saved'} );
  });
  /*
  Room.create(req.body.rooms, function (err) {
    if (err) {
      console.log(err);
    }// ...
  });*/
  
  
  for(room of rooms) {
     let hun = 100;
     for (room of rooms ) {
    room.room_numbers = [];
    for ( let i=0; i<room.no_of_rooms; i++ ) {
      room.room_numbers.push(hun + i);
    }
    hun += 100;
  }
    var roomer = new Room(room);

    roomer.save(function (err) {
      console.log(err) // #sadpanda
    });
  }
  
 res.status(200).json({"Success:": "Rooms Added Successfully"});
}

module.exports.add = function(req, res) {
  console.log(JSON.stringify(req));
  var room = new Room();
  room.name = req.body.name;
  room.base_price = req.body.base_price;
  room.ex_person_charge = req.body.ex_person_charge;
  room.ex_bed_charge = req.body.ex_bed_charge;
  room.no_of_rooms = req.body.no_of_rooms;
  room.occup_base = req.body.occup_base;
  room.occup_max = req.body.occup_max;
  room.occup_ex_beds = req.body.occup_ex_beds;
  room.save(function(err, room) {
    if (!err)res.status(200).json(room);
  });
};

module.exports.update = function(req, res) {
console.log(req.body)
  var room = new Room();
  room.type = req.body.type;
  room.base_price = req.body.base_price;
  room.ex_person_charge = req.body.ex_person_charge;
  room.ex_bed_charge = req.body.ex_bed_charge;
  room.no_of_rooms = req.body.no_of_rooms;
  room.occup_base = req.body.occup_base;
  room.occup_max = req.body.occup_max;
  room.occup_ex_beds = req.body.occup_ex_beds;

  Room.findOne({ name: req.body.name }, function(err,doc){  
    doc.type= req.body.type, 
    doc.beds= req.body.beds,
    doc.cost = req.body.cost;
    doc.img = req.body.img;
    doc.save(function(err, room) {
    if (!err)res.status(200).json(room);
  });
  });
};

module.exports.delete = function(req, res) {
  Room.remove({ name: req.body.name }, function (err, removed){
    if (!err)res.status(200).json(removed);
  });

};
