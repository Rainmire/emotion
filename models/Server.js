const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('Emote');

const ServerSchema = new Schema({
  serverId:{
    type: String,
    required: true,
    index: true
  },
  emotes: [EmoteSchema]
});

const Server = mongoose.model('emotes', EmoteSchema);