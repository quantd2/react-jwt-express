var mongoose = require('mongoose');
var Board = mongoose.model('Board');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var getAuthor = function(req, res, callback) {
  console.log("Finding author with email " + req.payload.email);
  if (req.payload.email) {
    User
      .findOne({ email : req.payload.email })
      .exec(function(err, user) {
        if (!user) {
          sendJSONresponse(res, 404, {
            "message": "User not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        callback(req, res, user);
      });

  } else {
    sendJSONresponse(res, 404, {
      "message": "User not found"
    });
    return;
  }

};

/* POST a new board, providing a name */
/* /api/boards */
module.exports.boardCreateOne = function(req, res, next) {
  console.log("create a new board");
  getAuthor(req, res, function(req, res, user) {
    if(req.body.name) {
      var board = new Board(req.body);

      board.author = user;
      return board.save(function(err) {
        if(err) {
          sendJSONresponse(res, 402, err);
          return next(err);
        }

        return sendJSONresponse(res, 201, board);
      });
    } else {
      sendJSONresponse(res, 400, {
        "message": "All fields required"
      });
    }
  });
};

/* GET all boards of a user */
/* /api/boards */
module.exports.getAllBoardsOfUser = function(req, res, next) {
  console.log("get all boards from user");
  getAuthor(req, res, function(req, res, user) {
    Board.find({author: user})
      .select('name _id author')
      .exec(function(err, boards){
        if(err) {
          sendJSONresponse(res, 402, err);
          return next(err);
        }
        return sendJSONresponse(res, 200, boards);
      });

  });
};


module.exports.getBoardData = function(req, res, next) {
  console.log("get all lists from board");
  getAuthor(req, res, function(req, res, user) {
    board = Board.findById(req.params.id)
      .select('name _id author')
      .populate({
        path: 'lists', select: 'name _id', populate: { path: 'cards', select: 'isArchived name _id' }
      })
      .exec(function(err, board){
        if(err) {
          return sendJSONresponse(res, 402, err);
        }
        if(!board) {
          return sendJSONresponse(res, 404, "board not found");
        }
        return sendJSONresponse(res, 200, board);
      });
  });
};
