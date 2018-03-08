const addEmote = require('./add_emote');
const deleteEmote = require('./delete_emote');
const listEmotes = require('./list_emotes');
const listCommands = require('./list_commands');

module.exports = (bot, channelId, message, evt) => {

  let args = message.substring(1).split(' ');
  let cmd = args[0];
  let serverId = bot.channels[channelId].guild_id;

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

const testCommand = (bot, channelId) => {
}
