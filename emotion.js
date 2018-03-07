const Discord = require('discord.io');
const logger = require('winston');
const mongoose = require('mongoose');

// Load actions
// require('./actions/emote_actions.js');
const utilAction = require('./actions/util_actions');

// DB Config
const db = require('./config/database');
// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect(db.mongoURI, {
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
const dc = require('./config/discord');
const bot = new Discord.Client({
  token: dc.discordToken,
  autorun: true
});
bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userId, channelId, message, evt) {

  // console.log("ARGUMENTS");
  // console.log(arguments);

  // console.log(evt);

  if (message.substring(0, 1) === '!') {
    emoteAction(bot, channelId, message, evt);
  } else if (message.substring(0, 1) === '?') {
    utilAction(bot, channelId, message, evt);
  }
});

bot.on('disconnect', function(errMsg, code) {
  console.log(errMsg);
});

///TESTING

// bot.on('any', (event) => {
//   console.log("event: ");
//   console.log(event);

//   console.log("channels: ");
//   console.log(bot.channels);
// })

// bot.on('message', (user, userId, channelId, message, evt) => {
//   console.log(bot.channels[channelId].guild_id);

// })