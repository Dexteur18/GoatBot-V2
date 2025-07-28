const { getPrefix } = global.utils;
const { commands } = global.GoatBot;
const os = require("os");

module.exports = {
  config: {
    name: "uptime",
    version: "1.0",
    author: "SAMYCHARLES",
    countDown: 5,
    role: 0,
    description: {
      en: "Check the bot's uptime and server status.",
    },
    category: "info",
    guide: {
      en: "{pn}uptime",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadData, role }) {
    const { threadID } = event;
    const prefix = getPrefix(threadID);
    
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    
    const uptimeMessage = `╭─────────────⭓
│ 😪 **BOT UPTIME** 😪
├─────────────⭓
│ 🕒 Uptime: ${hours} hours, ${minutes} minutes, ${seconds} seconds
│ 💻 Server: ${os.hostname()}
│ 🌐 OS: ${os.platform()} ${os.release()}
╰────────────────⭓`;

    await message.reply({
      body: uptimeMessage,
    });
  },
};
