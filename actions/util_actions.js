const mongoose = require('mongoose');
var nl = require('os').EOL;

// require('../models/Emote');
// const Emote = mongoose.model('emotes');
const Server = require('../models/Server');

utilAction = (bot, channelId, message, evt) => {

  let args = message.substring(1).split(' ');
  let cmd = args[0];
  let serverId = bot.channels[channelId].guild_id

  switch(cmd) {
    case 'add':
      addEmote(args, bot, channelId, evt, serverId);
      break;
    // case 'delete':
    //   deleteEmote(args, bot, channelId, serverId);
    //   break;
    // case 'emotes':
    //   listEmotes(bot, channelId, serverId);
    //   break;
    case 'help':
      listCommands(bot, channelId);
  }
}

/*
addEmote = (args, bot, channelID, evt) => {
  
  if (args.length !== 2) {
    bot.sendMessage({
      to: channelID,  
      message: 'Invalid syntax. Use "?add <emote>", where <emote> is one word.'
    });
  } else {
    let images = evt.d.attachments;
    if (images.length === 0) {
      bot.sendMessage({
        to: channelID,
        message: 'Use this command as a comment when uploading an image!'
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
*/
addEmote = (args, bot, channelId, evt) => {
  // let query = Server
  //   .findOne({serverId: 1})
  //   .select('emotes');
  // query.exec((err, emotes) => {
  //   if (err) return handleError(err);
  //   console.log(emotes);
  // })
  let cmd = args[1];

  Server.findOne({serverId: 1}, 'emotes', (err, res) => {
    let emotes = res.emotes;
    let emoteExists = false;
    for (let i = 0; i < emotes.length; i++) {
      // console.log(emotes[i].command);
      if (emotes[i].command === cmd) {
        emoteExists = true;
        break;
      }
    }
    if (emoteExists) {
      console.log("exists");
    } else {
      console.log("does not exist");
      emotes.push({command: cmd, imageUrl: 'test'});
      res.save();
    }
  })
}

// deleteEmote = (args, bot, channelID) => {
//   if (args.length !== 2) {
//     bot.sendMessage({
//       to: channelID,
//       message: 'Invalid syntax. Use "?delete <emote>", where <emote> is one word.'
//     });
//   } else {
//     let cmd = args[1];
//     let emote = Emote.find({command: cmd}, (err, results) => {
//       if (err) {
//         bot.sendMessage({
//           to: channelID,
//           message: err
//         });
//       } else if (results.length !== 0) {
//         Emote.remove({command: cmd}, (err) => {
//           if (err) {
//             bot.sendMessage({
//               to: channelID,
//               message: err
//             });
//           } else {
//             bot.sendMessage({
//               to: channelID,
//               message: `Emote "!${cmd}" deleted!`
//             });
//           }
//         })
        
//       } else {
//         bot.sendMessage({
//           to: channelID,
//           message: `Emote "!${cmd}" does not exist.`
//         });
        
//       }
//     })
//   }
// }

// listEmotes = (bot, channelID) => {
//   Emote.find({}, 'command',
//   {
//     sort: {
//       command: 1
//     }
//   },
//   (err, results) => {
//     if (err) {
//       bot.sendMessage({
//         to: channelID,
//         message: err
//       });
//     } else if (results.length !== 0){
//       let emoteList = '```' + nl;
//       results.forEach((res) => {
//         emoteList += "!" + (res.command) + nl
//       })
//       emoteList += '```';

//       bot.sendMessage({
//         to: channelID,
//         message: emoteList
//       });
//     } else {
//       bot.sendMessage({
//         to: channelID,
//         message: "No emotes yet. Add one!"
//       });
//     }
//   })

// }

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