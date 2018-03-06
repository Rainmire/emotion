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


addEmote = (args, bot, channelID, evt) => {
  let errorMessage = "Error code 1. Please submit a bug report!";
  let error = false;
  if (args.length !== 2) {
    errorMessage = 'Invalid syntax. Use "?add <emote>", where <emote> is one word.';
    error = true;
  } else {
    let images = evt.d.attachments;
    if (images.length === 0) {      
      errorMessage = 'Use this command as a comment when uploading an image!';
      error = true;
    } else {
      let cmd = args[1];
      let url = images[0].url;

      Server.findOne({serverId: 1}, 'emotes', (err, res) => {
        //TODO: check if server exists in DB

        let emotes = res.emotes;
        let emoteExists = false;
        let dbMessage;

        for (let i = 0; i < emotes.length; i++) {
          if (emotes[i].command === cmd) {
            emoteExists = true;
            break;
          }
        }
        if (err) {
          dbMessage = err;
        } else if (emoteExists) {          
          dbMessage = `Emote "!${cmd}" already exists.`;
        } else {
          emotes.push({command: cmd, imageUrl: url});
          res.save();
          dbMessage = `New emote "!${cmd}" added!`;
        }
        bot.sendMessage({
          to: channelID,  
          message: dbMessage
        });
      })
    }
  }
  if (error) {
    bot.sendMessage({
      to: channelID,  
      message: errorMessage
    });
  }
}

// addEmote = (args, bot, channelId, evt) => {

//   let cmd = args[1];

//   Server.findOne({serverId: 1}, 'emotes', (err, res) => {
//     let emotes = res.emotes;
//     let emoteExists = false;
//     for (let i = 0; i < emotes.length; i++) {
//       // console.log(emotes[i].command);
//       if (emotes[i].command === cmd) {
//         emoteExists = true;
//         break;
//       }
//     }
//     if (emoteExists) {
//       console.log("exists");
//     } else {
//       console.log("does not exist");
//       emotes.push({command: cmd, imageUrl: 'test'});
//       res.save();
//     }
//   })
// }

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