const searchByServerToken = require('./search/server_token');
const searchByServerId = require('./search/server_id');
const nl = require('os').EOL;

const importEmotes = (args, bot, channelId, serverId) => {
  let errorMessage;
  let error = false;
  if (args.length !== 2) {
    errorMessage = 'Invalid syntax. Use "?import <token>". To generate a token, use "?gettoken" in the source server.';
    error = true;
  } else {
    let serverToken = args[1];
    if (serverToken = 'default') {
      serverToken = 'f2105565-81ee-4309-a91a-7b502b029f30';
    }
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
              message: dest.err
            });
          } else {
            let sourceEmotes = source.server.emotes;
            let destEmotes = dest.server.emotes;
            let newEmotes = [];
            let i = 0;
            let j = 0;
            let conflicts = [];
            while (i < sourceEmotes.length || j < destEmotes.length) {
              let newEmote;
              let sourceEmote = sourceEmotes[i];
              let destEmote = destEmotes[j];              

              if (i >= sourceEmotes.length) {
                newEmote = destEmote;
                j++;
              } else if (j >= destEmotes.length) {
                newEmote = sourceEmote;
                i++;
              } else if (sourceEmote.command < destEmote.command) {
                newEmote = sourceEmote;
                i++;
              } else if (sourceEmote.command > destEmote.command) {
                newEmote = destEmote;
                j++;
              } else {
                newEmote = destEmote;
                conflicts.push(sourceEmote.command);
                i++;
                j++;
              }
              newEmotes.push({command: newEmote.command, imageUrl: newEmote.imageUrl});
            }
            dest.server.emotes = newEmotes;
            dest.server.save();

            let message = 'New emotes have been imported!';
            if (conflicts.length > 0) {
              message += nl + 'The following commands already exist, and were skipped:' + nl +
                              '```';
              conflicts.forEach((cmd) => {
                message += nl + '!' + cmd;
              })
              message += nl + '```';
            }
            bot.sendMessage({
              to: channelId,  
              message: message
            });
          }
        }});
      }
      if (clientMessage) {
        bot.sendMessage({
          to: channelId,  
          message: clientMessage
        });
      }
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