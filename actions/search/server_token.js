const Server = require('../../models/Server');

const searchByServerToken = ({serverToken, callback}) => {
  Server.findOne({serverToken: serverToken}, 'emotes', (err, res) => {
    let queryResult = {
      server: res,
      err: err
    }
    console.log(serverToken);
    console.log(queryResult);
    callback(queryResult);
  });
}

module.exports = searchByServerToken;