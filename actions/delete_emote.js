const findEmote = require('./find_emote');

const deleteEmote = (args, bot, channelId) => {
  let errorMessage = "Error code 2. Please submit a bug report!";
  let error = false;
  if (args.length !== 2) {
    errorMessage = 'Invalid syntax. Use "?delete <emote>", where <emote> is one word.';
    error = true;
  } else {
    let cmd = args[1];
    let serverId = bot.channels[channelId].guild_id;

    findEmote(serverId, (queryResult) => {
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
    }, cmd);
  }
  if (error) {
    bot.sendMessage({
      to: channelId,  
      message: errorMessage
    });
  }
}

module.exports = deleteEmote;