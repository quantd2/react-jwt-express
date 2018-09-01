var mongoose = require('mongoose');

var CardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
}, {timestamps: true});

mongoose.model('Card', CardSchema);
