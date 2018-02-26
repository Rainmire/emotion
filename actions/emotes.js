const mongoose = require('mongoose');

require('../models/Emote');
const Emote = mongoose.model('emotes');

emoteAction = (bot, channelID, message, evt) => {

  let args = message.substring(1).split(' ');
  let cmd = args[0];  

  let images = evt.d.attachments
  if (images.length !== 0) {
    addEmote(cmd, images[0].url, bot, channelID);
  } else {
    sendEmote(cmd, bot, channelID);
  }

}

addEmote = (cmd, url, bot, channelID) => {

  let emote = Emote.find({command: cmd}, (err, result) => {
    if (err) {
      bot.sendMessage({
        to: channelID,
        message: err
      });
    } else if (result.length === 0) {
      new Emote({
        command: cmd,
        imageUrl: url
      }).save()
      bot.sendMessage({
        to: channelID,
        message: `New emote "!${cmd}" saved!`
      });
    } else {
      bot.sendMessage({
        to: channelID,
        message: `Emote "!${cmd}" already exists.`
      });
      
    }
  })
}

sendEmote = (cmd, bot, channelID) => {
  let emote = Emote.find({command: cmd}, 'imageUrl', (err, result) => {
    if (err) {
      bot.sendMessage({
        to: channelID,
        message: err
      });
    } else if (result.length === 0) {
      bot.sendMessage({
        to: channelID,
        message: `"!${cmd}" is not a valid command.`
      });
    } else {
      bot.sendMessage({
        to: channelID,
        message: result[0].imageUrl
      });
    }
  })

}