const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const emoteSchema = require('./Emote');

const serverSchema = new Schema({
  serverId:{
    type: Number,
    required: true,
    // index: true
  },
  // serverToken:{
  //   type: String,
  //   required: true,
  //   index: true
  // },
  emotes: [emoteSchema]
});

module.exports = mongoose.model('servers', serverSchema);