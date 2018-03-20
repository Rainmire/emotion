const nl = require('os').EOL;

const helpMessages =
{
  listcommands:
    '```' + nl +
    'emotion, by Rainmire - A Discord bot for creating and sending custom emotes' + nl + nl +

    'Actions:' + nl +
    '  !<emote>        Send an emote' + nl + nl +

    'Utility:' + nl +
    '  ?emotes          List all emotes' + nl +
    '  ?add <emote>     Add a new emote. Use as a comment when adding an image' + nl +
    '  ?delete <emote>  Delete an emote' + nl +
    '  ?gettoken        Generate a token used to import emotes from this server' + nl +
    '  ?import <token>  Import emotes from another server' + nl +
    '  ?help            List all commands' + nl + nl +

    'Use "?help <command>" to get more detailed information about a specific command.' + nl +
    '```',
  emote:
    '```' + nl +
    '!<emote>'+ nl + nl +
    'Send an emote using its command. ' + nl +
    'To list all emote commands in this server use "?emotes"' + nl +
    '```',
  add: 
    '```' + nl +
    '?add <emote>' + nl + nl +
    'Add a new emote. ' + 
    'Use this command as a comment when sending an image using the plus button. ' +
    '<emote> represents the command you will call the emote with using "!<emote>". ' +
    'To change an emote, delete it first using "?delete <emote>".' + nl +
    '```',
  delete: 
    '```' + nl +
    '?delete <emote>' + nl + nl +
    'Delete an emote. ' +
    '<emote> represents the command used to call that emote, using "!<emote>". ' +
    'You can then reassign that emote\'s command to a new emote using "?add <emote>".' + nl +
    '```',
  emotes:
    '```' + nl +
    '?emotes' + nl + nl +
    'List all emotes in this server. ' +
    'If you would like to import emotes, try "?help import".' + nl +
    '```',
  gettoken:
    '```' + nl +
    '?gettoken' + nl + nl +
    'Reveal this server\'s token. ' +
    'You can then use "?import <token>" in another server to import all emotes from this server. ' + nl +
    '```',
  import:
    '```' + nl +
    '?import <token>' + nl + nl +
    'Import all emotes from another server using that server\'s token. ' +
    'You can get a server\'s token using "?gettoken". ' +
    'To revoke access to your emotes, you can invalidate your token with "?resettoken", which will assign your server a new token.' + nl +
    '```',
  help:
    '```' + nl +
    '?help' + nl + nl +
    'List all the commands that can be performed. ' +
    'To get more help regarding a specific command, use "?help <command>". ' +
    'To list all the emotes instead, use "?emotes".' + nl +
    '```',
  invalid:
    '```' + nl +
    'Command does not exist.' + nl +
    '```'
}

module.exports = helpMessages;