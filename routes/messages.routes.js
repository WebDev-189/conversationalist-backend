const router = require("express").Router()
const Message = require("./../models/Message.model")
const Conversation = require("./../models/Conversation.model")
const { isAdmin } = require("./../middlewares/authMiddlewares")
/**
 * ! All routes are prefixed by /api/messages
 *
 */

router.get("/:conversationId", async (req, res, next) => {
	const { conversationId } = req.params
	try {
		const foundConversation = await Conversation.findOne({
			_id: conversationId,
			participants: { $in: [req.userId] },
		})
		if (!foundConversation) {
			return res.status(401).json({ message: "Denied" })
		}
		const allMessages = await Message.find({
			conversation: conversationId,
		})
			.sort({ createdAt: 1 })
			.populate("creator", "username picture")
			.select("creator content")
		res.json(allMessages)
	} catch (error) {
		next(error)
	}
})

router.post("/:conversationId", async (req, res, next) => {
	try {
		const creatorId = req.userId
		const { conversationId } = req.params
		const message = req.body.message
		const newMessage = await Message.create({
			creator: creatorId,
			content: message,
			conversation: conversationId,
		})
		res.status(201).json(newMessage)
	} catch (error) {
		next(error)
	}
})

router.put("/:messageId", async (req, res, next) => {
	try {
		const updatedMessage = await Message.findOneAndUpdate(
			{
				creator: req.userId,
				_id: req.params.messageId,
			},
			req.body,
			{ new: true }
		)
		if (!updatedMessage) {
			return res.status(401).json({ message: "Denied !" })
		}
		res.status(202).json(updatedMessage)
	} catch (error) {
		next(error)
	}
})

router.delete("/:messageId", async (req, res, next) => {
	try {
		await Message.findOneAndDelete({
			_id: req.params.messageId,
			creator: req.userId,
		})
		res.sendStatus(204)
	} catch (error) {
		next(error)
	}
})
// router.delete("/:messageId", isAdmin, async (req, res, next) => {
// 	try {
// 		await Message.findOneAndDelete({
// 			_id: req.params.messageId,
// 			// creator: req.userId,
// 		})
// 		res.sendStatus(204)
// 	} catch (error) {
// 		next(error)
// 	}
// })

module.exports = router
