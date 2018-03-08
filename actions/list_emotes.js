const nl = require('os').EOL;
const findEmote = require('./find_emote');

listEmotes = (bot, channelId, serverId) => {
  findEmote(serverId, (queryResult) => {
    let dbMessage;
    let server = queryResult.server;
    if (queryResult.err) {
      dbMessage = "Error code 1-l. Please submit a bug report at https://github.com/Rainmire/emotion/issues";
    } else if (server && server.emotes.length > 0) {
      dbMessage = '```' + nl;
      server.emotes.forEach((emote) => {
        dbMessage += "!" + (emote.command) + nl
      })
      dbMessage += '```';
    } else {
      dbMessage = 'No emotes yet. Add one!';
    }
    bot.sendMessage({
      to: channelId,
      message: dbMessage
    });
  });
}

module.exports = listEmotes;