module.exports = async MFBGB => {
  // Log that the bot is online.
  MFBGB.logger.log(`|BS-Discord| ${MFBGB.BSDiscord.user.tag}, ready to serve ${MFBGB.BSDiscord.users.size} users in ${MFBGB.BSDiscord.guilds.size} servers.`, "RDY");

  //MFBGB.BSDiscord.user.setActivity(`${MFBGB.config.prefix}help`, {type: "PLAYING"});
  
  MFBGB.BSDiscord.ready = true;
};