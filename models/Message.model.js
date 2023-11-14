const { Schema, model } = require("mongoose")

const messageSchema = new Schema(
	{
		creator: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		content: {
			type: String,
			maxLength: 5000,
			minLength: 1,
		},
		conversation: {
			type: Schema.Types.ObjectId,
			ref: "Conversation",
		},
	},
	{ timestamps: true }
)

const Message = model("Message", messageSchema)
module.exports = Message
