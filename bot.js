const Discord = require('discord.io');
const logger = require('winston');
const discordAuth = require('./discord_auth.json');
require('./routes/emotes.js');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
const bot = new Discord.Client({
  token: discordAuth.token,
  autorun: true
});
bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {

  performAction(bot, channelID, message);
  
});
