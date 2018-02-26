const mongoose = require('mongoose');

require('../models/Emote');
const Emote = mongoose.model('emotes');

emoteAction = (bot, channelID, message, evt) => {

  let args = message.substring(1).split(' ');
  let cmd = args[0];  

  sendEmote(cmd, bot, channelID);
  
}

sendEmote = (cmd, bot, channelID) => {
  let emote = Emote.find({command: cmd}, 'imageUrl', (err, results) => {
    if (err) {
      bot.sendMessage({
        to: channelID,
        message: err
      });
    } else if (results.length !== 0){
      bot.sendMessage({
        to: channelID,
        message: results[0].imageUrl
      });
    }
  })

}