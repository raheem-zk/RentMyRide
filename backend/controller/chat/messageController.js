import messageSchema from '../../models/message.js';

export const addMessage = async (req, res)=>{
    try {
        const { chatId, senderId, text} = req.body;
        const message = new messageSchema({
            chatId,
            senderId,
            text
        })
        const result = await message.save();
        return res.json({message:'success', result})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessage = async (req, res)=>{
    try {
        const result = await messageSchema.findOne({chatId: req.params.chatId})
        res.json({message: 'success', result});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}