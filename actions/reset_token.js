const searchByServerId = require('./search/server_id');
const generateUuid = require('./generate_uuid');

const resetToken = (bot, channelId, serverId) => {
  searchByServerId({serverId, callback: (queryResult) => {
    let clientMessage;
    if (queryResult.err) {
      clientMessage = err;
    } else {
      let server = queryResult.server;
      let newToken = generateUuid();
      server.serverToken = newToken;
      server.save();
      clientMessage = `Your new token is \`${newToken}\`. ` +
      'The previous token assigned to this server has been invalidated, ' +
      'and can no longer be used to import from this server.';
    }
    bot.sendMessage({
      to: channelId,  
      message: clientMessage
    });
  }})
}

module.exports = resetToken;