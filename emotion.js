#!/usr/bin/env node
// const Discord = require('discord.io');
const Discord = require('discord.js');

// const logger = require('winston');
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
// logger.remove(logger.transports.Console);
// logger.add(logger.transports.Console, {
//   colorize: true
// });
// logger.level = 'debug';

// Initialize Discord client
const discordConfig = require('./config/discord');

// const client = new Discord.Client({
//   token: dc.discordToken,
//   autorun: true
// });
// client.on('ready', function (evt) {
//   logger.info('Connected');
//   logger.info('Logged in as: ');
//   logger.info(client.username + ' - (' + client.id + ')');
// });

// client.on('message', function (user, userId, channelId, message, evt) {
//   actionRouter(client, channelId, message, evt);
// });

// client.on('disconnect', function(errMsg, code) {
//   console.log(errMsg);
// });

//using discord.js
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);  
});

client.on('message', msg => {
  console.log('serverId1', msg.guild.id)
  console.log('type1', typeof msg.guild.id)
  actionRouter(msg);
});

client.login(discordConfig.discordToken);