var mongoose = require('mongoose');

var Posts = mongoose.model('Posts', {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  tag: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  publishedDate: {
    type: Number,
    default: null
  }
});

module.exports = {Posts};
