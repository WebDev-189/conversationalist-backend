require("dotenv").config()
require("./../db")
const Conversation = require("./../models/Conversation.model")

async function dropAll() {
	try {
		console.time("deleteTime")
		await Conversation.deleteMany()
		console.timeEnd("deleteTime")
	} catch (error) {
		console.log(error)
	} finally {
		process.exit()
	}
}

dropAll()
