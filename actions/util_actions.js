const mongoose = require('mongoose');

require('../models/Emote');
const Emote = mongoose.model('emotes');

utilAction = (bot, channelID, message, evt) => {

  let args = message.substring(1).split(' ');
  let cmd = args[0];  

  switch(cmd) {
    case 'add':
      addEmote(args, bot, channelID, evt);
      break;
    case 'delete':
      // deleteEmote(args, bot, channelID);
      break;
    case 'list':
      // listEmotes();
    case 'help':
      // listCommands();
  }
}

addEmote = (args, bot, channelID, evt) => {
  let images = evt.d.attachments
  if (images.length === 0) {
    bot.sendMessage({
      to: channelID,
      message: 'Use this command when uploading an image!'
    });
  } else {
    if (args.length !== 2) {
      bot.sendMessage({
        to: channelID,
        message: 'Invalid syntax. Use "?add <emote>", where <emote> is one word.'
      });
    } else {
      let cmd = args[1];
      let url = images[0].url;
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
  }
}

// sendEmote = (cmd, bot, channelID) => {
//   let emote = Emote.find({command: cmd}, 'imageUrl', (err, result) => {
//     if (err) {
//       bot.sendMessage({
//         to: channelID,
//         message: err
//       });
//     } else if (result.length === 0) {
//       bot.sendMessage({
//         to: channelID,
//         message: `"!${cmd}" is not a valid command.`
//       });
//     } else {
//       bot.sendMessage({
//         to: channelID,
//         message: result[0].imageUrl
//       });
//     }
//   })

// }