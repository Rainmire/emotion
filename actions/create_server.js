const Server = require('../models/Server');
const generateUuid = require('./generate_uid');

const createServer = (serverId) => {
  let uuid = generateUuid();
  return new Server({serverId: serverId, serverToken: uuid, emotes: []});
}

module.exports = createServer;