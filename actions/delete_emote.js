const searchByServerId = require('./search/server_id');

const deleteEmote = (args, bot, channelId, serverId) => {
  let errorMessage;
  let error = false;
  if (args.length !== 2) {
    errorMessage = 'Invalid syntax. Use "?delete <emote>", where <emote> is one word.';
    error = true;
  } else {
    let cmd = args[1];
    searchByServerId({serverId, cmd, callback: (queryResult) => {
      let clientMessage;
      if (queryResult.err) {
        clientMessage = "Error code 1-d. Please submit a bug report at https://github.com/Rainmire/emotion/issues";
      } else if (queryResult.idx === -1) {
        clientMessage = `Emote "!${cmd}" does not exist.`;        
      } else {
        let server = queryResult.server;
        let emote = server.emotes[queryResult.idx];
        emote.remove();
        server.save();
        clientMessage = `Emote "!${cmd}" deleted!`;
      }
      bot.sendMessage({
        to: channelId,  
        message: clientMessage
      });
    }});
  }
  if (error) {
    bot.sendMessage({
      to: channelId,  
      message: errorMessage
    });
  }
}

module.exports = deleteEmote;