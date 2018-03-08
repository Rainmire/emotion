const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emoteSchema = new Schema({
  command:{
    type: String,
    required: true,
    index: true
  },
  imageUrl:{
    type: String,
    required: true
  }
});

module.exports = emoteSchema;

// const Emote = mongoose.model('emotes', EmoteSchema);