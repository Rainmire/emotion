const findEmote = require('./find_emote');
const createServer = require('./create_server');

const getToken = (bot, channelId, serverId) => {
  findEmote(serverId, (queryResult) => {
    let clientMessage;
    if (queryResult.err) {
      clientMessage = "Error code 1-f. Please submit a bug report at https://github.com/Rainmire/emotion/issues";
    } else {
      let server = queryResult.server;
      if (!server) {
        server = createServer(serverId);
      }
      clientMessage = `Your token is <${server.serverToken}>. Use "?import <token>" to import emotes from this server!`;
    }
    bot.sendMessage({
      to: channelId,  
      message: clientMessage
    });
  })
}
module.exports = getToken;