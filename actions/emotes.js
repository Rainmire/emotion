const mongoose = require('mongoose');

require('../models/Emote');
const Emote = mongoose.model('emotes');

emoteAction = (bot, channelID, message, evt) => {

  let args = message.substring(1).split(' ');
  let cmd = args[0];  

  let images = evt.d.attachments
  if (images.length !== 0) {
    addEmote(cmd, images[0].url, bot);
  } else {
    sendEmote(cmd);
  }

}

addEmote = (cmd, url) => {
  new Emote({
    command: cmd,
    imageUrl: url
  }).save()
  console.log(`New emote saved: ${cmd}`);
}

sendEmote = (cmd) => {
  console.log(`Emote sent: ${cmd}`);
}

// bot.sendMessage({
//   to: channelID,
//   message: img
// });