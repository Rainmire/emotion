const searchByServerId = require('./search/server_id');
const nl = require('os').EOL;

const getToken = (bot, channelId, serverId) => {
  searchByServerId({serverId, callback: (queryResult) => {
    let clientMessage;
    if (queryResult.err) {
      clientMessage = "Error code 1-f. Please submit a bug report at https://github.com/Rainmire/emotion/issues";
    } else {
      let server = queryResult.server;      
      clientMessage = 'Your token is' + nl +
        server.serverToken + nl +
        'Use "?import <token>" to import emotes from this server!'
    }
    bot.sendMessage({
      to: channelId,  
      message: clientMessage
    });
  }})
}
module.exports = getToken;