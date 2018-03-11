const nl = require('os').EOL;

const listCommands = (args, bot, channelId) => {
  let clientMessage;
  if (args.length > 2) {
    clientMessage = '';
  } else if (args.length === 2) {
    switch(args[1]) {
      case 'add':
        clientMessage = '```' + nl +
        '?add <emote>' + nl +
        'Add a new emote. ' + 
        'Use this command as a comment when sending an image using the plus button. ' +
        '<emote> represents the command you will call the emote with, using "!<emote>". ' +
        'To change an emote, delete it first using "?delete <emote>".' + nl +
        '```';
        break;
      case 'delete':
        clientMessage = '```' + nl +
        '?delete <emote>' + nl +
        'Delete an emote. ' +
        '<emote> represents the command used to call that emote, using "!<emote>". ' +
        'You can then reassign that emote\'s command to a new emote using "?add <emote>".' + nl +
        '```';
        break;
      case 'emotes':
        clientMessage = '```' + nl +
        '?emotes' + nl +
        'List all emotes in this server. ' +
        'If you would like to import emotes, try "?help import".' + nl +
        '```';
        break;
      case 'gettoken':
        clientMessage = '```' + nl +
        '?gettoken' + nl +
        'Reveal this server\'s token.' +
        'You can then use "?import <token>" in another server to import all emotes from this server. ' + nl +
        '```';
        break;
      case 'import':
        clientMessage = '```' + nl +
        '?import <token>' + nl +
        'Import all emotes from another server using that server\'s token' +
        'You can get the token using "?gettoken".' +
        'To revoke access to your emotes, you can invalidate your token with "?resettoken", which then assigns your server a new token.' + nl +
        '```';
        break;
      case 'help':
        clientMessage = 'List all the commands. What did you expect?';
        break;
    }
    clientMessage = '';
  } else {
    clientMessage = 
    '```' + nl +
    'Commands:' + nl +
    '  !<emote>        Send an emote' + nl +
    '  ?add <emote>    Add a new emote. Use as a comment when adding an image' + nl +
    '  ?delete <emote> Delete an emote' + nl +
    '  ?emotes         List all emotes' + nl +
    '  ?gettoken       Generate a token used to import emotes from this server.' + nl +
    '  ?import <token> Import emotes from another server. ' + 
    'Use ?gettoken in the source server to generate a token. ' + nl +
    '  ?help           Print this index' + nl +
    '```';
  }
  bot.sendMessage({
    to: channelId,
    message: clientMessage
  });
}

module.exports = listCommands;