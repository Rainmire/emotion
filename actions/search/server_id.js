const Server = require('../../models/Server');
const createServer = require('../create_server');

const searchByServerId = ({serverId, callback, name = null}) => {

  Server.findOne({serverId: serverId}, (err, res) => {
    let queryResult = {
      idx: -1,
      server: res,
      err: err
    }
    console.log('res', res)
    if (!res) {
      //create new server
      queryResult.server = createServer(serverId);
    } else if (name) {
      let emotes = res.emotes

      for (let i = 0; i < emotes.length; i++) {
        if (emotes[i].command === name) {
          queryResult.idx = i;
          break;
        }
      }
    }
    callback(queryResult);
  });
}

module.exports = searchByServerId;