const findEmote = require('./find_emote');

const sendEmote = (cmd, bot, channelId, serverId) => {
  findEmote(serverId, (queryResult) => {
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
  }, cmd)
}

module.exports = sendEmote;