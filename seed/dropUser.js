require("dotenv").config()
require("./../db")
const User = require("./../models/User.model")

async function dropUser() {
	try {
		console.time("deleteTime")
		await User.deleteMany()
		console.timeEnd("deleteTime")
	} catch (error) {
		console.log(error)
	} finally {
		process.exit()
	}
}

dropUser()
