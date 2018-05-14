const searchByServerId = require('./search/server_id');

const sendEmote = (msg, args) => {
  let serverId = msg.guild.id;
  let name = args[0];

  searchByServerId({serverId, name, callback: (queryResult) => {
    let send = true;
    let clientMessage;
    if (queryResult.err) {
      clientMessage = "Error code 1-s. Please submit a bug report at https://github.com/Rainmire/emotion/issues";
    } else if (queryResult.idx !== -1) {
      clientMessage = queryResult.server.emotes[queryResult.idx].imageUrl;
    } else {
      send = false;
    }
    if (send) {
      msg.channel.send({
        files: [clientMessage]
      })
    }
  }});
}

module.exports = sendEmote;