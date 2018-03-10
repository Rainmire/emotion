const joinMessages = require('../server_messages/join_server_messages.json');

const joinServer = (bot, channelId) => {
  let messageIdx = Math.floor(Math.random()*Math.floor(joinMessages.length));
  let clientMessage = joinMessages[messageIdx] + ' Try typing `?help` to see what I can do.';
  bot.sendMessage({
    to: channelId,
    message: clientMessage
  });
}

module.exports = joinServer;