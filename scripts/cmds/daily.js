const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "daily",
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "Nhận quà hàng ngày",
			en: "Receive daily gift"
		},
		category: "game",
		guide: {
			vi: "   {pn}: Nhận quà hàng ngày"
				+ "\n   {pn} info: Xem thông tin quà hàng ngày",
			en: "   {pn}"
				+ "\n   {pn} info: View daily gift information"
		},
		envConfig: {
			rewardFirstDay: {
				coin: 100,
				exp: 10
			}
		}
	},

	langs: {
		vi: {
			monday: "Thứ 2",
			tuesday: "Thứ 3",
			wednesday: "Thứ 4",
			thursday: "Thứ 5",
			friday: "Thứ 6",
			saturday: "Thứ 7",
			sunday: "Chủ nhật",
			alreadyReceived: "Bạn đã nhận quà rồi",
			received: "Bạn đã nhận được %1 coin và %2 exp"
		},
		en: {
			monday: "Monday",
			tuesday: "Tuesday",
			wednesday: "Wednesday",
			thursday: "Thursday",
			friday: "Friday",
			saturday: "Saturday",
			sunday: "Sunday",
			alreadyReceived: "𝐩𝐤 𝐭𝐮 𝐞𝐬 𝐜𝐨𝐧 𝐜𝐨𝐦𝐱𝐚, 𝐭𝐮 𝐚 𝐝𝐞́𝐣𝐚̀ 𝐫𝐞𝐜̧𝐮𝐬 𝐝𝐮 𝐟𝐫𝐢𝐜𝐬 𝐝𝐞 𝐥𝐚 𝐩𝐚𝐫 𝐝𝐞 𝐄𝐥𝐯𝐢𝐬 𝐭𝐚𝐩 𝒃𝒂𝒍 𝒑𝒐𝒖𝒓 𝒗𝒐𝒊𝒓 🤦‍♂️",
			received: "𝑽𝒐𝒖𝒔 𝒂𝒗𝒊𝒆𝒛 𝒓𝒆𝒄̧𝒖 %1 coin 𝒆𝒕 %2 exp 𝒅𝒆 𝒍𝒂 𝒑𝒂𝒓𝒕 𝒅𝒖 𝒎𝒐𝒏 𝑩𝒐𝒔𝒔 🙃 𝒕𝒂𝒑 •𝒔𝒍𝒐𝒕 𝒈𝒊𝒓𝒍 𝒐𝒖 𝒔𝒍𝒐𝒕 𝒃𝒐𝒚 𝒑𝒐𝒖𝒓 𝒋𝒐𝒖𝒆́ 🗣️"
		}
	},

	onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
		const reward = envCommands[commandName].rewardFirstDay;
		if (args[0] == "info") {
			let msg = "";
			for (let i = 1; i < 8; i++) {
				const getCoin = Math.floor(reward.coin * (1 + 20 / 100) ** ((i == 0 ? 7 : i) - 1));
				const getExp = Math.floor(reward.exp * (1 + 20 / 100) ** ((i == 0 ? 7 : i) - 1));
				const day = i == 7 ? getLang("sunday") :
					i == 6 ? getLang("saturday") :
						i == 5 ? getLang("friday") :
							i == 4 ? getLang("thursday") :
								i == 3 ? getLang("wednesday") :
									i == 2 ? getLang("tuesday") :
										getLang("monday");
				msg += `${day}: ${getCoin} coin, ${getExp} exp\n`;
			}
			return message.reply(msg);
		}

		const dateTime = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
		const date = new Date();
		const currentDay = date.getDay(); // 0: sunday, 1: monday, 2: tuesday, 3: wednesday, 4: thursday, 5: friday, 6: saturday
		const { senderID } = event;

		const userData = await usersData.get(senderID);
		if (userData.data.lastTimeGetReward === dateTime)
			return message.reply(getLang("alreadyReceived"));

		const getCoin = Math.floor(reward.coin * (1 + 20 / 100) ** ((currentDay == 0 ? 7 : currentDay) - 1));
		const getExp = Math.floor(reward.exp * (1 + 20 / 100) ** ((currentDay == 0 ? 7 : currentDay) - 1));
		userData.data.lastTimeGetReward = dateTime;
		await usersData.set(senderID, {
			money: userData.money + getCoin,
			exp: userData.exp + getExp,
			data: userData.data
		});
		message.reply(getLang("received", getCoin, getExp));
	}
};
