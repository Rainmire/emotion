const Server = require('../models/Server');
const findEmote = require('./find_emote');
const findInsertionIndex = require('./find_insertion_index');
const generateUuid = require('./generate_uid');

const addEmote = (args, bot, channelId, evt, serverId) => {
  let errorMessage;
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
      findEmote(serverId, (queryResult) => {
        let dbMessage;        
        if (queryResult.err) {
          dbMessage = "Error code 1-a. Please submit a bug report at https://github.com/Rainmire/emotion/issues";
        } else if (queryResult.idx !== -1) {
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
      }, cmd);      
    }
  }
  if (error) {
    bot.sendMessage({
      to: channelId,  
      message: errorMessage
    });
  }
}

module.exports = addEmote;