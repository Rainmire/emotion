const nl = require('os').EOL;
const helpMessages = require('../server_messages/help_messages');

const listCommands = (args, bot, channelId) => {
  let clientMessage;
  if (args.length > 2) {
    clientMessage = 'Invalid syntax. Type `?help` to list all commands ' +
    'or `?help <command>` to get more information about a specific command.';
  } else if (args.length === 2) {
    switch(args[1]) {
      case 'add':
        clientMessage = helpMessages.add;
        break;
      case 'delete':
        clientMessage = helpMessages.delete;
        break;
      case 'emotes':
        clientMessage = helpMessages.emotes;
        break;
      case 'gettoken':
        clientMessage = helpMessages.gettoken;
        break;
      case 'import':
        clientMessage = helpMessages.import;
        break;
      default:
        clientMessage = helpMessages.invalid;
    }
  } else {
    clientMessage = helpMessages.help;
  }
  bot.sendMessage({
    to: channelId,
    message: clientMessage
  });
}

module.exports = listCommands;