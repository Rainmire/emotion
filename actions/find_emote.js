const Server = require('../models/Server');

const findEmote = (serverId, emoteAction, cmd = null) => {
  return Server.findOne({serverId: serverId}, 'emotes', (err, res) => {
    let queryResult = {
      idx: -1,
      server: res
    }
    if (res && cmd) {
      let emotes = res.emotes

      for (let i = 0; i < emotes.length; i++) {
        if (emotes[i].command === cmd) {
          queryResult.idx = i;
          break;
        }
      }
    }
    emoteAction(queryResult);
  });
}

module.exports = findEmote;