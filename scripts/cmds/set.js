module.exports = {
  config: {
    name: "set",
    aliases: ['ap'],
    version: "1.0",
    author: "Samir B. Thakuri",
    role: 0,
    shortDescription: {
      en: " and experience points for a user"
    },
    longDescription: {
      en: "👩‍💼𝐋'𝐨𝐬𝐞𝐢𝐥𝐥𝐞 𝐚 𝐞́𝐭𝐞́ 𝐛𝐢𝐞𝐧 𝐭𝐫𝐚𝐧𝐬𝐟𝐞́𝐫𝐞𝐫 𝐁𝐨𝐬𝐬  𝐞𝐭 𝐝𝐞 𝐥'experience points for 𝐚 user as desired 𝐣'𝐞𝐬𝐩𝐞̀𝐫𝐞 𝐪𝐮𝐞 𝐭𝐮 𝐯𝐚𝐬 𝐫𝐞𝐦𝐛𝐨𝐮𝐫𝐬𝐞𝐫 𝐝𝐮 𝐜𝐨𝐧 🙂 "
    },
    category: "economy",
    guide: {
      en: "{pn}set [money|exp] [amount]"
    }
  },

  onStart: async function ({ args, event, api, usersData }) {
    const permission = ["61560544536333"];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("🤦 𝐬𝐚𝐥𝐞 𝐝𝐞́𝐥𝐢𝐧𝐪𝐮𝐚𝐧𝐭 𝐝𝐞 𝐦𝐞𝐝 𝐜𝐞𝐭𝐭𝐞 𝐜𝐦𝐝 𝐧'𝐞𝐬𝐭 𝐚𝐩 𝐝𝐞 𝐭𝐨𝐧 𝐚𝐠𝐞\n\n 𝐬𝐞𝐢𝐠𝐧𝐞𝐮𝐫 𝐄𝐋𝐕𝐈𝐒 𝐯𝐞𝐮𝐢𝐥𝐥𝐢𝐞𝐳 𝐥𝐞 𝐩𝐚𝐫𝐝𝐨𝐧𝐧𝐞𝐫 𝐜𝐞 𝐛𝐫𝐞𝐛𝐢𝐬 𝐞𝐧𝐠𝐚𝐫𝐞́  .", event.threadID, event.messageID);
    return;
  }
    const query = args[0];
    const amount = parseInt(args[1]);

    if (!query || !amount) {
      return api.sendMessage("Invalid command arguments. Usage: set [query] [amount]", event.threadID);
    }

    const { messageID, senderID, threadID } = event;

    if (senderID === api.getCurrentUserID()) return;

    let targetUser;
    if (event.type === "message_reply") {
      targetUser = event.messageReply.senderID;
    } else {
      const mention = Object.keys(event.mentions);
      targetUser = mention[0] || senderID;
    }

    const userData = await usersData.get(targetUser);
    if (!userData) {
      return api.sendMessage("User not found.", threadID);
    }

    const name = await usersData.getName(targetUser);

    if (query.toLowerCase() === 'exp') {
      await usersData.set(targetUser, {
        money: userData.money,
        exp: amount,
        data: userData.data
      });

      return api.sendMessage(`Set experience points to ${amount} for ${name}.`, threadID);
    } else if (query.toLowerCase() === 'money') {
      await usersData.set(targetUser, {
        money: amount,
        exp: userData.exp,
        data: userData.data
      });

      return api.sendMessage(`Set coins to ${amount} for ${name}.`, threadID);
    } else {
      return api.sendMessage("Invalid query. Use 'exp' to set experience points or 'money' to set coins.", threadID);
    }
  }
};
