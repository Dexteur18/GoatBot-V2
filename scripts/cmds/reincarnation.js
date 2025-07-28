const fs = require("fs-extra");

module.exports = {
	config: {
		name: "réincarnation",
		version: "1.0",
		author: "Dexteur",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Khởi động lại bot",
			en: "Restart bot"
		},
		longDescription: {
			vi: "Khởi động lại bot",
			en: "Restart bot"
		},
		category: "Owner",
		guide: {
			vi: "   {pn}: Khởi động lại bot",
			en: "   {pn}: Restart bot"
		}
	},

	langs: {
		vi: {
			restartting: "🔄 | Đang khởi động lại bot..."
		},
		en: {
			restartting: "🔑 | 𝗥𝗲́𝗶𝗻𝗰𝗮𝗿𝗻𝗮𝘁𝗶𝗼𝗻 𝗱𝘂 𝗯𝗼𝘁 𝗲𝗻 𝗰𝗼𝘂𝗿𝘀....(҂`_´)\n════ •『 ♡ 』• ═════\n𝙇𝙤𝙖𝙙𝙞𝙣𝙜.....□□□□□0%✨"
		}
	},

	onLoad: function ({ api }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		if (fs.existsSync(pathFile)) {
			const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
			api.sendMessage(`❤ |  𝗥𝗲́𝗶𝗻𝗰𝗮𝗿𝗻𝗮𝘁𝗶𝗼𝗻 𝙚𝙛𝙛𝙚𝙘𝙩𝙪𝙚 𝙖𝙫𝙚𝙘 𝙨𝙪𝙘𝙘𝙚𝙨 !!!\n❖ ── ✦ ──『✙』── ✦ ── ❖\n(⁠｡⁠•̀⁠ᴗ⁠-⁠)⁠✧ === ■■■■100%✨\n🕒 | 𝙏𝙞𝙢𝙚: ${(Date.now() - time) / 1000}s`, tid);
			fs.unlinkSync(pathFile);
		}
	},

	onStart: async function ({ message, event, getLang }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);
		await message.reply(getLang("restartting"));
		process.exit(2);
	}
};
