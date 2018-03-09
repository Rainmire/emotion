const searchByServerId = require('./search/server_id');

const sendEmote = (cmd, bot, channelId, serverId) => {
  searchByServerId({serverId, cmd, callback: (queryResult) => {
    let send = true;
    let clientMessage;
    if (queryResult.err) {
      clientMessage = "Error code 1-s. Please submit a bug report at https://github.com/Rainmire/emotion/issues";
    } else if (queryResult.idx !== -1) {
      clientMessage = queryResult.server.emotes[queryResult.idx].imageUrl;
    } else {
      send = false;
    }
    if (send) {
      bot.sendMessage({
        to: channelId,  
        message: clientMessage
      });
    }
  }});
}

module.exports = sendEmote;