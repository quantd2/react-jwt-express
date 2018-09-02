var mongoose = require('mongoose');

var CardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
  isArchived: { type: Boolean, default: false }
}, {timestamps: true});

CardSchema.methods.toggleArchive = function() {
  this.isArchived = !this.isArchived;
};


mongoose.model('Card', CardSchema);
