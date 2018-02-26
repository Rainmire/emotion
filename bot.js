const Discord = require('discord.io');
const logger = require('winston');
const discordAuth = require('./discord_auth.json');
// const express = require('express');
const mongoose = require('mongoose');

// Load actions
require('./actions/emotes.js');

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

  if (message.substring(0, 1) === '!') {
    emoteAction(bot, channelID, message, evt);
  }
});
