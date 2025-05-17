const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
    try {
        const { recipientId, text } = req.body;
        const message = new Message({ senderId: req.user.userId, recipientId, text });
        await message.save();
        res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { recipientId } = req.params;
        const messages = await Message.find({
            $or: [{ senderId: req.user.userId, recipientId }, { senderId: recipientId, recipientId: req.user.userId }]
        }).sort("createdAt");
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
