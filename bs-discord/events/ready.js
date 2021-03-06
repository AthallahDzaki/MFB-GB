module.exports = async MFBGB => {
  // Log that the bot is online.
  MFBGB.Logger.log(`|BS-Discord| ${MFBGB.BSDiscord.user.tag}, ready to serve ${MFBGB.BSDiscord.users.size} users in ${MFBGB.BSDiscord.guilds.size} servers.`, 'RDY');

  // MFBGB.BSDiscord.user.setActivity(`${MFBGB.config.prefix['BSDiscord']}help`, {type: "PLAYING"});

  // Initialize the music player
  require('../../music-player/main.js')(MFBGB);

  // Initialize the subscribable role module
  require('../modules/subscribable-role.js')(MFBGB);

  MFBGB.BSDiscord.ready = true;
};
