const findEmote = require('./find_emote');

listEmotes = (bot, channelId) => {
  let serverId = bot.channels[channelId].guild_id;
  findEmote(serverId, (queryResult) => {
    let dbMessage;
    let server = queryResult.server;
    if (server && server.emotes.length > 0) {
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