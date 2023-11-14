// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config()

// ℹ️ Connects to the database
// If you require a folder, node will look for an index file
require("./db")

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express")

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app)

// Fake login
// const User = require("./models/User.model")

// app.use(async (req, res, next) => {
// 	const id = "65436af3afc9b6bde77ec514"
// 	try {
// 		const connectedUser = await User.findById(id)
// 		req.userId = connectedUser
// 		next()
// 	} catch (error) {
// 		next(error)
// 	}
// })

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes")
app.use("/api", indexRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app)

module.exports = app
