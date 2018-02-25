const express = require('express');
const mongoose = require('mongoose');

require('../models/Emote');
const Emote = mongoose.model('emotes');

emoteAction = (bot, channelID, message) => {

  if (message.substring(0, 1) == '!') {
    let args = message.substring(1).split(' ');
    let cmd = args[0];  

    let img = cloudinary.url(`emote-bot/${cmd}.png`, 
      {
        transformation: [
          { width: 250, height: 250, crop: 'limit' },               
        ]
    })

    bot.sendMessage({
      to: channelID,
      message: img
    });

  }
}