const nl = require('os').EOL;
const searchByServerId = require('./search/server_id');

listEmotes = (bot, channelId, serverId) => {
  searchByServerId({serverId, callback: (queryResult) => {
    let clientMessage;
    let server = queryResult.server;
    if (queryResult.err) {
      clientMessage = "Error code 1-l. Please submit a bug report at https://github.com/Rainmire/emotion/issues";
    } else if (server && server.emotes.length > 0) {
      clientMessage = '```' + nl;
      server.emotes.forEach((emote) => {
        clientMessage += "!" + (emote.command) + nl
      })
      clientMessage += '```';
    } else {
      clientMessage = 'No emotes yet. Add one!';
    }
    bot.sendMessage({
      to: channelId,
      message: clientMessage
    });
  }});
}

module.exports = listEmotes;