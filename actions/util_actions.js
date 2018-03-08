const mongoose = require('mongoose');
var nl = require('os').EOL;

// require('../models/Emote');
// const Emote = mongoose.model('emotes');
const Server = require('../models/Server');

module.exports = (bot, channelId, message, evt) => {

  let args = message.substring(1).split(' ');
  let cmd = args[0];
  let serverId = bot.channels[channelId].guild_id

  switch(cmd) {
    case 'add':
      addEmote(args, bot, channelId, evt, serverId);
      break;
    case 'delete':
      deleteEmote(args, bot, channelId, serverId);
      break;
    // case 'emotes':
    //   listEmotes(bot, channelId, serverId);
    //   break;
    case 'help':
      listCommands(bot, channelId);
      break;
    case 'test':
      testCommand(bot, channelId);
      break;
  }
}

const testCommand = (bot, channelId) => {
  //credit to: https://gist.github.com/LeverOne/1308368
  // let foo = (a,b) => {for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b}
  // console.log(foo());

  let bar = bot.servers;
  channelId = '419970738548768778s';
  console.log(bar[channelId]);

}

//credit to: https://gist.github.com/LeverOne/1308368
const generateUuid = () => {for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b}

const findEmote = (serverId, cmd, emoteAction) => {
  return Server.findOne({serverId: serverId}, 'emotes', (err, res) => {
    let queryResult = {
      idx: -1,
      server: res
    }
    if (res) {
      let emotes = res.emotes

      for (let i = 0; i < emotes.length; i++) {
        if (emotes[i].command === cmd) {
          queryResult.idx = i;
          break;
        }
      }
    }
    emoteAction(queryResult);
  }); 
}

const findInsertionIndex = (emotes, cmd, start = 0, end = emotes.length - 1) => {
  let midpt = parseInt((start + end)/2, 10);

  if (start >= end) {
    if (emotes.length === 0 || cmd < emotes[midpt].command) {
      return midpt;
    } else {
      return midpt + 1;
    }
  }

  let cmd1 = emotes[midpt].command;
  let cmd2 = emotes[midpt + 1].command;

  if (cmd < cmd1) {
    return findInsertionIndex(emotes, cmd, start, midpt - 1);
  } else if (cmd > cmd2) {
    return findInsertionIndex(emotes, cmd, midpt + 1, end);
  } else {
    return midpt + 1;
  }
}

const addEmote = (args, bot, channelId, evt) => {
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

      let serverId = bot.channels[channelId].guild_id

      findEmote(serverId, cmd, (queryResult) => {
        let dbMessage;
        
        if (queryResult.idx !== -1) {
          dbMessage = `Emote "!${cmd}" already exists.`;
        } else {
          let server = queryResult.server;
          if (!server) {
            //create new server
            let uuid = generateUuid();
            server = new Server({serverId: serverId, serverToken: uuid, emotes: []});
          }
          let emotes = server.emotes;
          let idx = findInsertionIndex(emotes, cmd);
          emotes.splice(idx, 0, {command: cmd, imageUrl: url});
          server.save();
          dbMessage = `New emote "!${cmd}" added!`;
        }
        bot.sendMessage({
          to: channelId,  
          message: dbMessage
        });
      });      
    }
  }
  if (error) {
    bot.sendMessage({
      to: channelId,  
      message: errorMessage
    });
  }
}

const deleteEmote = (args, bot, channelId) => {
  let errorMessage = "Error code 2. Please submit a bug report!";
  let error = false;
  if (args.length !== 2) {
    errorMessage = 'Invalid syntax. Use "?delete <emote>", where <emote> is one word.';
    error = true;
  } else {
    let cmd = args[1];
    let serverId = bot.channels[channelId].guild_id

    findEmote(serverId, cmd, (queryResult) => {
      let dbMessage;

      if (queryResult.idx === -1) {
        dbMessage = `Emote "!${cmd}" does not exist.`;        
      } else {
        let server = queryResult.server;
        let emote = server.emotes[queryResult.idx];
        emote.remove();
        server.save();
        dbMessage = `Emote "!${cmd}" deleted!`;
      }
      bot.sendMessage({
        to: channelId,  
        message: dbMessage
      });
    })
  }
  if (error) {
    bot.sendMessage({
      to: channelId,  
      message: errorMessage
    });
  }
}

listEmotes = (bot, channelId) => {
  let serverId = bot.channels[channelId].guild_id
  findEmote(serverId, cmd, (queryResult) => {
    if (queryResult.idx !== -1) {
      //
    }
  })
}
// listEmotes = (bot, channelId) => {
//   Emote.find({}, 'command',
//   {
//     sort: {
//       command: 1
//     }
//   },
//   (err, results) => {
//     if (err) {
//       bot.sendMessage({
//         to: channelId,
//         message: err
//       });
//     } else if (results.length !== 0){
//       let emoteList = '```' + nl;
//       results.forEach((res) => {
//         emoteList += "!" + (res.command) + nl
//       })
//       emoteList += '```';

//       bot.sendMessage({
//         to: channelId,
//         message: emoteList
//       });
//     } else {
//       bot.sendMessage({
//         to: channelId,
//         message: "No emotes yet. Add one!"
//       });
//     }
//   })

// }

const listCommands = (bot, channelId) => {
  bot.sendMessage({
    to: channelId,
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