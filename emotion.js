const Discord = require('discord.io');
const logger = require('winston');
const mongoose = require('mongoose');

// Load routers
const actionRouter = require('./routers/action_router');

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
  actionRouter(bot, channelId, message, evt);
});

bot.on('disconnect', function(errMsg, code) {
  console.log(errMsg);
});
