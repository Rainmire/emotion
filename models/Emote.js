const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Emote = mongoose.model('emotes', EmoteSchema);