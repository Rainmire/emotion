const Server = require('../models/Server');

const findEmote = (serverId, emoteAction, cmd = null) => {
  Server.findOne({serverId: serverId}, 'emotes serverToken', (err, res) => {
    let queryResult = {
      idx: -1,
      server: res,
      err: err
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