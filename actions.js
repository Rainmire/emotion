const cloudinary = require('cloudinary');

performAction = (bot, channelID, message) => {

  if (message.substring(0, 1) == '!') {
    let args = message.substring(1).split(' ');
    let cmd = args[0];  

    switch(cmd) {
      case 'ping':
        bot.sendMessage({
          to: channelID,
          message: 'Pong!'
        });
        break;
      case 'bestgirl':
        bot.sendMessage({
          to: channelID,
          message: 'Satania!'
        });
        break;
      case 'sata-doya':
        bot.sendMessage({
          to: channelID,
          message: 'http://res.cloudinary.com/rainmire/image/upload/v1519547372/emote-bot/sata-doya.png'
        });
        break;
      case 'sata-glad':
        bot.sendMessage({
          to: channelID,
          message: 'http://res.cloudinary.com/rainmire/image/upload/v1519547372/emote-bot/sata-glad.jpg'
        });
        break;
    }


  }
}