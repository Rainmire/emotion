const joinServer = require('../actions/join_server');
const sendEmote = require('../actions/send_emote');
const addEmote = require('../actions/add_emote');
const deleteEmote = require('../actions/delete_emote');
const listEmotes = require('../actions/list_emotes');
const getToken = require('../actions/get_token');
const resetToken = require('../actions/reset_token');
const importEmotes = require('../actions/import_emotes');
const printHelp = require('../actions/print_help');

module.exports = (bot, channelId, message, evt) => {
  
  if (evt.d.type === 7) {
    if (evt.d.author.id === bot.id) {
      joinServer(bot, channelId);
    }
  }

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
      case 'gettoken':
        getToken(bot, channelId, serverId);
        break;
      case 'resettoken':
        resetToken(bot, channelId, serverId);
        break;
      case 'import':
        importEmotes(args, bot, channelId, serverId);
        break;
      case 'help':
        printHelp(args, bot, channelId);
        break;      
    }
  }
}
