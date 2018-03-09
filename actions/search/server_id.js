const Server = require('../../models/Server');
const createServer = require('../create_server');

const searchByServerId = ({serverId, callback, cmd = null}) => {
  Server.findOne({serverId: serverId}, 'emotes serverToken', (err, res) => {
    let queryResult = {
      idx: -1,
      server: res,
      err: err
    }
    if (!res) {
      //create new server
      queryResult.server = createServer(serverId);
    } else if (cmd) {
      let emotes = res.emotes

      for (let i = 0; i < emotes.length; i++) {
        if (emotes[i].command === cmd) {
          queryResult.idx = i;
          break;
        }
      }
    }
    callback(queryResult);
  });
}

module.exports = searchByServerId;