const { Schema, model } = require("mongoose")

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, "Username is required."],
			unique: true,
			trim: true,
		},
		picture: {
			type: String,
			default: "avatar.avif",
		},
		password: {
			type: String,
			required: true,
			// This will remove the password from queries made to the DB
			select: false,
		},
		role: {
			enum: ["admin", "user"],
			type: String,
			default: "user",
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
)

const User = model("User", userSchema)

module.exports = User
