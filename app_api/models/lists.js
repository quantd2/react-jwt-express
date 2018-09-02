var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');


var ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }]
}, {timestamps: true});

mongoose.model('List', ListSchema);
