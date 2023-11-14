require("dotenv").config()
require("./../db")
const Message = require("./../models/Message.model")

async function dropAll() {
	try {
		console.time("deleteTime")
		await Message.deleteMany()
		console.timeEnd("deleteTime")
	} catch (error) {
		console.log(error)
	} finally {
		process.exit()
	}
}

dropAll()
