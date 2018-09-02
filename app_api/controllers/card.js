var mongoose = require('mongoose');
var List = mongoose.model('List');
var Card = mongoose.model('Card');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.cardCreateOne = function(req, res, next) {
    console.log("create a new card");
    List.findById(req.body.listId).then(function(list) {
        if(!list) {
            return sendJSONresponse(res, 404, { "message": "Card not found" });
        }

        var card = new Card({ name: req.body.name });
        card.save(function(err) {
            if(err) {
                return sendJSONresponse(res, 402, err);
            }
            list.cards.push(card);
            list.save(function(err){
                if(err){
                    return sendJSONresponse(res, 402, err);
                };
            });
            return sendJSONresponse(res, 201, card);
        })
    })
};

module.exports.cardHandleDrop = function(req, res, next) {
    console.log("move card");
    Card.findById(req.params.id).then(function(card) {
        if(!card) {
            return sendJSONresponse(res, 404, { "message": "Card not found" });
        };

        List.findByIdAndUpdate(req.body.srcListId,
            {$pull: {cards: card._id}},
            {safe: true, upsert: false},
            function(err, doc) {
                if(err) {
                    return sendJSONresponse(res, 402, err);
                } else {
                    List.findByIdAndUpdate(req.body.desListId,
                        {$push: {cards: card}},
                        {safe: true, upsert: false},
                        function(err, doc) {
                            if(err) {
                                return sendJSONresponse(res, 402, err);
                            } else {
                                return sendJSONresponse(res, 200, { "message": "handle drop successfully" });
                            }
                        }
                    );
                }
            }
        );
    })
};

module.exports.cardArchiveToggle = function(req, res, next) {
    console.log("toggle archive card");
    Card.findById(req.params.id).then(function(card) {
        if(!card) {
            return sendJSONresponse(res, 404, { "message": "Card not found" });
        }
        card.toggleArchive();
        return card.save(function(err) {
            if(err) {
                sendJSONresponse(res, 402, err);
                return next(err);
            }

              return sendJSONresponse(res, 200, card);
        });
    });
};
