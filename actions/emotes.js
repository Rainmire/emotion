const mongoose = require('mongoose');

require('../models/Emote');
const Emote = mongoose.model('emotes');

emoteAction = (bot, channelID, message, evt) => {

  let args = message.substring(1).split(' ');
  let cmd = args[0];  

  let images = evt.d.attachments
  if (images.length !== 0) {
    addEmote(cmd, images[0].url);
  } else {
    sendEmote(cmd, bot, channelID);
  }

}

addEmote = (cmd, url) => {
  new Emote({
    command: cmd,
    imageUrl: url
  }).save()
  console.log(`New emote saved: ${cmd}`);
}

sendEmote = (cmd, bot, channelID) => {
  let emote = Emote.find({command: cmd}, 'imageUrl', (err, result) => {
    if (err) {
      console.log(`error: ${err}`);
    }
    else if (result.length === 0) {
      bot.sendMessage({
        to: channelID,
        message: `"!${cmd}" is not a valid command`
      });
    }
    else {
      bot.sendMessage({
        to: channelID,
        message: result[0].imageUrl
      });
    }
  })

  // console.log(`cmd: ${cmd}`);
  // console.log(`Find: ${Emote.find({command: cmd})}`);
  // console.log(`First: ${Emote.find({command: cmd})[0]}`);

  // console.log(emote);

  // let url = emote.imageUrl;

  // bot.sendMessage({
  //   to: channelID,
  //   message: url
  // });

  // console.log(`Emote sent: ${url}`);
}