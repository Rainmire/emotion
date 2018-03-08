// Detecting self server join
//on any, detect if type 7
//   -> if author id == self
//      -> send join message

// on !emote
// if server or emote can't be found nothing is sent
// this is OK

// on !delete
// if server or emote can't be found nothing is deleted
// this is OK

// on !add
// check if server exists in DB
//  if not -> 

//db.servers.update({serverId:1},{$push:{emotes:{command:'cmd2', imageUrl:'url2'}}})

/*schema
servers:{[
  {serverId:1,
   token: ###
   emotes: {
    cmd1: "url1",
    ...
   },
   ...
  }
]}



*/