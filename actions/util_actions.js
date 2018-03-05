const mongoose = require('mongoose');
var nl = require('os').EOL;

require('../models/Emote');
const Emote = mongoose.model('emotes');

utilAction = (bot, channelID, message, evt) => {

  // console.log("EVENT CONTENTS");
  // console.log(evt);

  let args = message.substring(1).split(' ');
  let cmd = args[0];  

  switch(cmd) {
    case 'add':
      addEmote(args, bot, channelID, evt);
      break;
    case 'delete':
      deleteEmote(args, bot, channelID);
      break;
    case 'emotes':
      listEmotes(bot, channelID);
      break;
    case 'help':
      listCommands(bot, channelID);
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
      let emote = Emote.find({command: cmd}, (err, results) => {
        if (err) {
          bot.sendMessage({
            to: channelID,
            message: err
          });
        } else if (results.length === 0) {
          new Emote({
            command: cmd,
            imageUrl: url
          }).save()
          bot.sendMessage({
            to: channelID,
            message: `New emote "!${cmd}" added!`
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

deleteEmote = (args, bot, channelID) => {
  if (args.length !== 2) {
    bot.sendMessage({
      to: channelID,
      message: 'Invalid syntax. Use "?delete <emote>", where <emote> is one word.'
    });
  } else {
    let cmd = args[1];
    let emote = Emote.find({command: cmd}, (err, results) => {
      if (err) {
        bot.sendMessage({
          to: channelID,
          message: err
        });
      } else if (results.length !== 0) {
        Emote.remove({command: cmd}, (err) => {
          if (err) {
            bot.sendMessage({
              to: channelID,
              message: err
            });
          } else {
            bot.sendMessage({
              to: channelID,
              message: `Emote "!${cmd}" deleted!`
            });
          }
        })
        
      } else {
        bot.sendMessage({
          to: channelID,
          message: `Emote "!${cmd}" does not exist.`
        });
        
      }
    })
  }
}

listEmotes = (bot, channelID) => {
  Emote.find({}, 'command',
  {
    sort: {
      command: 1
    }
  },
  (err, results) => {
    if (err) {
      bot.sendMessage({
        to: channelID,
        message: err
      });
    } else if (results.length !== 0){
      let emoteList = '```' + nl;
      results.forEach((res) => {
        emoteList += "!" + (res.command) + nl
      })
      emoteList += '```';

      bot.sendMessage({
        to: channelID,
        message: emoteList
      });
    } else {
      bot.sendMessage({
        to: channelID,
        message: "No emotes yet. Add one!"
      });
    }
  })

}

listCommands = (bot, channelID) => {
  bot.sendMessage({
    to: channelID,
    message: 
    '```' + nl +
    'Commands:' + nl +
    '  !<emote>        Send an emote' + nl +
    '  ?add <emote>    Add a new emote. Use as a comment when adding an image' + nl +
    '  ?delete <emote> Delete an emote' + nl +
    '  ?emotes         List all emotes' + nl +
    '  ?help           Print this index' + nl +
    '```'
  });
}