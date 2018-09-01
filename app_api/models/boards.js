var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');


var BoardSchema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  name: { type: String, required: true },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

BoardSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

BoardSchema.methods.slugify = function() {
  this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

mongoose.model('Board', BoardSchema);
