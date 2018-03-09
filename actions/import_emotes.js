const searchByServerToken = require('./search/server_token');
const searchByServerId = require('./search/server_id');

const importEmotes = (args, bot, channelId, serverId) => {
  let errorMessage;
  let error = false;
  if (args.length !== 2) {
    errorMessage = 'Invalid syntax. Use "?import <token>". To generate a token, use "?gettoken" in the source server.';
    error = true;
  } else {
    let serverToken = args[1];
    searchByServerToken({serverToken, callback: (source) => {
      let clientMessage;        
      if (source.err) {
        clientMessage = "Error code 1-i. Please submit a bug report at https://github.com/Rainmire/emotion/issues";
      } else if (!source.server) {
        clientMessage = `Token <${serverToken}> is invalid. ` +
        'The server you are attempting to import from may have been reassigned a new token, or may no longer exist. '
      } else {
        searchByServerId({serverId, callback: (dest) => {
          if (dest.err) {
            bot.sendMessage({
              to: channelId,  
              message: "Error code 2-i."
            });
          } else {
            let sourceEmotes = source.server.emotes;
            let destEmotes = dest.server.emotes;
            let newEmotes = [];
            let i = 0;
            let j = 0;
            while (i < sourceEmotes.length || j < destEmotes.length) {
              let newEmote;
              if (i >= sourceEmotes.length) {
                newEmote = destEmotes[j];
                j++;
              } else if (j >= destEmotes.length) {
                newEmote = sourceEmotes[i];
                i++;
              } else if (sourceEmotes[i] < destEmotes[j]) {
                newEmote = sourceEmotes[i];
                i++;
              } else {
                newEmote = destEmotes[j];
                j++;
              }
              newEmotes.push({command: newEmote.command, imageUrl: newEmote.imageUrl});
            }
            dest.server.emotes = newEmotes;
            dest.server.save();            
          }
        }});
        clientMessage = "New emotes have been imported!";
      }
      bot.sendMessage({
        to: channelId,  
        message: clientMessage
      });
    }});
  }

  if (error) {
    bot.sendMessage({
      to: channelId,  
      message: errorMessage
    });
  }
}

module.exports = importEmotes;