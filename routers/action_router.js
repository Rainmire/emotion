const addEmote = require('../actions/add_emote');
const deleteEmote = require('../actions/delete_emote');
const listEmotes = require('../actions/list_emotes');
const listCommands = require('../actions/list_commands');
const sendEmote = require('../actions/send_emote');

module.exports = (bot, channelId, message, evt) => {

  let args = message.substring(1).split(' ');
  let cmd = args[0];
  let serverId = bot.channels[channelId].guild_id;

  if (message.substring(0, 1) === '!') {
    sendEmote(cmd, bot, channelId, serverId);
  } else if (message.substring(0, 1) === '?') {    
    switch(cmd) {
      case 'add':
        addEmote(args, bot, channelId, evt, serverId);
        break;
      case 'delete':
        deleteEmote(args, bot, channelId, serverId);
        break;
      case 'emotes':
        listEmotes(bot, channelId, serverId);
        break;
      case 'help':
        listCommands(bot, channelId);
        break;
      case 'test':
        testCommand(bot, channelId);
        break;
    }
  }
}

const testCommand = (bot, channelId) => {
}
