const nl = require('os').EOL;

const listCommands = (bot, channelId) => {
  bot.sendMessage({
    to: channelId,
    message: 
    '```' + nl +
    'Commands:' + nl +
    '  !<emote>        Send an emote' + nl +
    '  ?add <emote>    Add a new emote. Use as a comment when adding an image' + nl +
    '  ?delete <emote> Delete an emote' + nl +
    '  ?emotes         List all emotes' + nl +
    '  ?gettoken       Generates a token used to import emotes from this server.' + nl +
    '  ?import <token> Imports emotes from another server. Use ?gettoken in the source server to generate a token.' + nl +
    '  ?help           Print this index' + nl +
    '```'
  });
}

module.exports = listCommands;