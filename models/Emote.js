const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EmoteSchema = new Schema({
  command:{
    type: String,
    required: true
  },
  imageUrl:{
    type: String,
    required: true
  }
});

mongoose.model('emotes', emoteSchema);