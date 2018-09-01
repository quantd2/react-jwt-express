var mongoose = require('mongoose');
var Board = mongoose.model('Board');
var List = mongoose.model('List');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* POST a new list, providing a name */
/* /api/lists */
module.exports.listCreateOne = function(req, res, next) {
  console.log("create a new list");
  Board.findById(req.params.id).then(function(board){
    if (!board) {
      return sendJSONresponse(res, 404, {
        "message": "Board not found"
      });
    };

    var list = new List({name: req.body.name});
    list.save(function(err){
      if(err){
        return sendJSONresponse(res, 402, err);
      };
      board.lists.push(list);
      board.save(function(err){
        if(err){
          return sendJSONresponse(res, 402, err);
        };
      });
      return sendJSONresponse(res, 201, list);
    });
  })
};
