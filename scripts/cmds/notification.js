const { getStreamsFromAttachment, log } = global.utils;
const mediaTypes = ["photo", 'png', "animated_image", "video", "audio"];

module.exports = {
	config: {
		name: "callad",
		version: "1.7",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "gửi báo cáo, góp ý, báo lỗi,... của bạn về admin bot",
			en: "send report, feedback, bug,... to admin bot"
		},
		category: "contacts admin",
		guide: {
			vi: "   {pn} <tin nhắn>",
			en: "   {pn} <message>"
		}
	},

	langs: {
		vi: {
			missingMessage: "Vui lòng nhập tin nhắn bạn muốn gửi về admin",
			sendByGroup: "\n- Được gửi từ nhóm: %1\n- Thread ID: %2",
			sendByUser: "\n- Được gửi từ người dùng",
			content: "\n\nNội dung:\n─────────────────\n%1\n─────────────────\nPhản hồi tin nhắn này để gửi tin nhắn về người dùng",
			success: "Đã gửi tin nhắn của bạn về %1 admin thành công!\n%2",
			failed: "Đã có lỗi xảy ra khi gửi tin nhắn của bạn về %1 admin\n%2\nKiểm tra console để biết thêm chi tiết",
			reply: "📍 Phản hồi từ admin %1:\n─────────────────\n%2\n─────────────────\nPhản hồi tin nhắn này để tiếp tục gửi tin nhắn về admin",
			replySuccess: "Đã gửi phản hồi của bạn về admin thành công!",
			feedback: "📝 Phản hồi từ người dùng %1:\n- User ID: %2%3\n\nNội dung:\n─────────────────\n%4\n─────────────────\nPhản hồi tin nhắn này để gửi tin nhắn về người dùng",
			replyUserSuccess: "Đã gửi phản hồi của bạn về người dùng thành công!",
			noAdmin: "Hiện tại bot chưa có admin nào"
		},
		en: {
			missingMessage: "Please enter the message you want to send to admin",
			sendByGroup: "\n- Sent from group: %1\n- Thread ID: %2",
			sendByUser: "\n- Sent from user",
			content: "\n\nContent:\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n%1\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\nReply this message to send message to user",
			success: "𝙈𝙚𝙨𝙨𝙖𝙜𝙚 𝙩𝙧𝙖𝙣𝙨𝙛𝙚𝙧𝙚 𝙖 %1😪 𝙖𝙙𝙢𝙞𝙣(𝙨) 𝙖𝙫𝙚𝙘 𝙨𝙪𝙘𝙘𝙚𝙨 !\n%2",
			failed: "𝐄𝐜𝐡𝐞𝐜 𝐝𝐞 𝐥'𝐞𝐧𝐯𝐨𝐢 𝐝𝐞 𝐯𝐨𝐭𝐫𝐞 𝐫𝐞𝐪𝐮𝐞𝐭𝐞 𝐚 😴%1😴 𝐚𝐝𝐦𝐢𝐧(𝐬)\n%2\n𝐌𝐨𝐧 𝐚𝐝𝐦𝐢𝐧 𝐯𝐞𝐫𝐢𝐟𝐢𝐞𝐫𝐚 𝐥𝐚 𝐜𝐨𝐧𝐬𝐨𝐥𝐞 𝐩𝐨𝐮𝐫 𝐫𝐞𝐠𝐥𝐞𝐫 𝐜𝐞 𝐝𝐞𝐭𝐚𝐢𝐥 !",
			reply: "✰| 𝐑𝐞𝐩𝐨𝐧𝐬𝐞 𝐝𝐞 𝐦𝐨𝐧 𝐜𝐫𝐞𝐚𝐭𝐞𝐮𝐫 𝐭𝐨𝐮𝐭 𝐩𝐮𝐢𝐬𝐬𝐚𝐧𝐭 ☆ᎬᏝᏉᎥᎦ☆ %1:\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n%2\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n𝐑𝐞𝐩𝐨𝐧𝐝𝐬 𝐚 𝐜𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐩𝐨𝐮𝐫 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐞𝐫 𝐥𝐚 𝐜𝐨𝐧𝐯𝐞𝐫𝐬𝐚𝐭𝐢𝐨𝐧 𝐚𝐯𝐞𝐜 𝐦𝐨𝐧 𝐜𝐫𝐞𝐚𝐭𝐞𝐮𝐫 𝐥𝐞 𝐭𝐨𝐮𝐭 𝐩𝐮𝐢𝐬𝐬𝐚𝐧𝐭 ☆𝗗𝗲𝘅𝘁𝗲𝘂𝗿☆",
			replySuccess: "📩| 𝐕𝐨𝐭𝐫𝐞 𝐫𝐞́𝐩𝐨𝐧𝐬𝐞 𝐚 𝐞́𝐭𝐞́ 𝐛𝐢𝐞𝐧 𝐞𝐧𝐯𝐨𝐲𝐞́ 𝗕𝗼𝘀𝘀 ",
			feedback: "😪| 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐝𝐞 𝐥'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 %1:\n- User ID: %2%3\n\nContent:\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n%4\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\nReply this message to send message to user",
			replyUserSuccess: "📩| 𝐓𝐚 𝐫𝐞𝐪𝐮𝐞𝐭𝐞 𝐚 𝐞́𝐭𝐞́ 𝐭𝐫𝐚𝐧𝐬𝐦𝐢𝐬𝐞. 𝐦𝐨𝐧 𝐜𝐫𝐞𝐚𝐭𝐞𝐮𝐫 ☆ᎬᏝᏉᎥᎦ☆😪➳",
			noAdmin: "Bot has no admin at the moment"
		}
	},

	onStart: async function ({ args, message, event, usersData, threadsData, api, commandName, getLang }) {
		const { config } = global.GoatBot;
		if (!args[0])
			return message.reply(getLang("missingMessage"));
		const { senderID, threadID, isGroup } = event;
		if (config.adminBot.length == 0)
			return message.reply(getLang("noAdmin"));
		const senderName = await usersData.getName(senderID);
		const msg = "==📨𝗖𝗔𝗟𝗟📬ᏔᎻᎬᎬᏞᏆᏁᏳ📨=="
			+ `\n- User Name: 🖤${senderName}🖤`
			+ `\n- User ID: 🧡${senderID}🧡`
			+ (isGroup ? getLang("sendByGroup", (await threadsData.get(threadID)).threadName, threadID) : getLang("sendByUser"));

		const formMessage = {
			body: msg + getLang("content", args.join(" ")),
			mentions: [{
				id: senderID,
				tag: senderName
			}],
			attachment: await getStreamsFromAttachment(
				[...event.attachments, ...(event.messageReply?.attachments || [])]
					.filter(item => mediaTypes.includes(item.type))
			)
		};

		const successIDs = [];
		const failedIDs = [];
		const adminNames = await Promise.all(config.adminBot.map(async item => ({
			id: item,
			name: await usersData.getName(item)
		})));

		for (const uid of config.adminBot) {
			try {
				const messageSend = await api.sendMessage(formMessage, uid);
				successIDs.push(uid);
				global.GoatBot.onReply.set(messageSend.messageID, {
					commandName,
					messageID: messageSend.messageID,
					threadID,
					messageIDSender: event.messageID,
					type: "userCallAdmin"
				});
			}
			catch (err) {
				failedIDs.push({
					adminID: uid,
					error: err
				});
			}
		}

		let msg2 = "";
		if (successIDs.length > 0)
			msg2 += getLang("success", successIDs.length,
				adminNames.filter(item => successIDs.includes(item.id)).map(item => ` <@${item.id}> (${item.name})`).join("\n")
			);
		if (failedIDs.length > 0) {
			msg2 += getLang("failed", failedIDs.length,
				failedIDs.map(item => ` <@${item.adminID}> (${adminNames.find(item2 => item2.id == item.adminID)?.name || item.adminID})`).join("\n")
			);
			log.err("CALL ADMIN", failedIDs);
		}
		return message.reply({
			body: msg2,
			mentions: adminNames.map(item => ({
				id: item.id,
				tag: item.name
			}))
		});
	},

	onReply: async ({ args, event, api, message, Reply, usersData, commandName, getLang }) => {
		const { type, threadID, messageIDSender } = Reply;
		const senderName = await usersData.getName(event.senderID);
		const { isGroup } = event;

		switch (type) {
			case "userCallAdmin": {
				const formMessage = {
					body: getLang("reply", senderName, args.join(" ")),
					mentions: [{
						id: event.senderID,
						tag: senderName
					}],
					attachment: await getStreamsFromAttachment(
						event.attachments.filter(item => mediaTypes.includes(item.type))
					)
				};

				api.sendMessage(formMessage, threadID, (err, info) => {
					if (err)
						return message.err(err);
					message.reply(getLang("replyUserSuccess"));
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						messageIDSender: event.messageID,
						threadID: event.threadID,
						type: "adminReply"
					});
				}, messageIDSender);
				break;
			}
			case "adminReply": {
				let sendByGroup = "";
				if (isGroup) {
					const { threadName } = await api.getThreadInfo(event.threadID);
					sendByGroup = getLang("sendByGroup", threadName, event.threadID);
				}
				const formMessage = {
					body: getLang("feedback", senderName, event.senderID, sendByGroup, args.join(" ")),
					mentions: [{
						id: event.senderID,
						tag: senderName
					}],
					attachment: await getStreamsFromAttachment(
						event.attachments.filter(item => mediaTypes.includes(item.type))
					)
				};

				api.sendMessage(formMessage, threadID, (err, info) => {
					if (err)
						return message.err(err);
					message.reply(getLang("replySuccess"));
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						messageIDSender: event.messageID,
						threadID: event.threadID,
						type: "userCallAdmin"
					});
				}, messageIDSender);
				break;
			}
			default: {
				break;
			}
		}
	}
};
