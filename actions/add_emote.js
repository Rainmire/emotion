const searchByServerId = require('./search/server_id');
const findInsertionIndex = require('./find_insertion_index');

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
      searchByServerId({serverId, cmd, callback: (queryResult) => {
        let clientMessage;        
        if (queryResult.err) {
          clientMessage = "Error code 1-a. Please submit a bug report at https://github.com/Rainmire/emotion/issues";
        } else if (queryResult.idx !== -1) {
          clientMessage = `Emote "!${cmd}" already exists. ` + 
          'If you would like to change an emote, delete it first using `?delete <emote>`';
        } else {
          let server = queryResult.server;          
          let emotes = server.emotes;
          let idx = findInsertionIndex(emotes, cmd);
          emotes.splice(idx, 0, {command: cmd, imageUrl: url});
          server.save();
          clientMessage = `New emote "!${cmd}" added!`;
        }
        bot.sendMessage({
          to: channelId,  
          message: clientMessage
        });
      }});
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