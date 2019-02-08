exports.run = async (MFBGB, message, args) => {
  message.delete().catch(e => {
    console.error(e);
  });
  const g = message.guild,
        // subCmdStr = args.join(' '),
        subCommands = {};
  let subCmdName = args.shift(),
      radioVoiceCnl;
      // radioTextCnl = null,
      // radioTextCnlID;


  if (subCmdName) subCmdName = subCmdName.toLowerCase();

  const getCnls = () => { // eslint-disable-line one-var
    /* eslint-disable indent */
    // Get the voice channel if its name is provided at the last argument
    radioVoiceCnl = g.channels.find(c => c.type === 'voice' && c.name === args[args.length - 1])
                    || (message.member.voiceChannel ? message.member.voiceChannel // Otherwise, get the channel the sender is currently in
                                                    : null); // If the sender is NOT in any voice channels, return null and end the command
    /* eslint-enable indent */
    if (radioVoiceCnl === null) {
      MFBGB.Logger.warn(`|BS-Discord| The message sender doesn't provide any voice channel name, nor isn't in any channel, though it's needed`);
      return false;
    }
    // radioTextCnlID = MFBGB.getTextCnlIdByVoiceCnl(g, radioVoiceCnl);
    // if (radioTextCnlID) radioTextCnl = g.channels.get(radioTextCnlID);

    return true;
  };

  subCommands['help'] = args => {
    const outputGenerators = {
      'DEFAULT': () => {
        let output = '';

        output += `= radiocnlコマンド ヘルプ =

== !!radiocnl open ==
ラジオ用VCを開場して、一般ユーザーが接続できるようにします

== !!radiobgm close ==
ラジオ用VCを閉場して、一般ユーザーが接続できないようにします`;

        return output;
      },
    };
    // eslint-disable-next-line one-var
    const wantedCmd = Object.keys(outputGenerators).includes(args[0]) ? args[0] : 'DEFAULT';
    message.channel.send(outputGenerators[wantedCmd](), {code: 'asciidoc', split: {char: '\u200b'}});
  };

  subCommands['open'] = args => {
    if (!getCnls()) return;

    const roleEveryone = g.defaultRole;
    radioVoiceCnl.overwritePermissions(
      roleEveryone,
      {'CONNECT': true},
      'Started a radio program'
    ).then(() => {
      MFBGB.Logger.log(`|BS-Discord| Opened the voice channel '${radioVoiceCnl.name}'`);
    }).catch(e => {
      MFBGB.Logger.error(`|BS-Discord| Failed to open the voice channel: 'e'`);
    });
  };

  subCommands['close'] = args => {
    if (!getCnls()) return;

    const roleEveryone = g.defaultRole;
    radioVoiceCnl.overwritePermissions(
      roleEveryone,
      {'CONNECT': false},
      'Ended a radio program'
    ).then(() => {
      MFBGB.Logger.log(`|BS-Discord| Closed the voice channel '${radioVoiceCnl.name}'`);
    }).catch(e => {
      MFBGB.Logger.error(`|BS-Discord| Failed to close the voice channel: 'e'`);
    });
  };

  subCmdName = Object.keys(subCommands).includes(subCmdName) ? subCmdName : 'help';
  subCommands[subCmdName](args);
  return;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'STF',
};

exports.help = {
  name: 'radiocnl',
  category: 'RADIO',
  description: 'ラジオチャンネル 開閉場コマンド',
  usage: 'radiocnl <サブコマンド名> <サブコマンド引数>',
};