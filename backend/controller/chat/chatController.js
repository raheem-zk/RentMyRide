import chatShema from '../../models/chat.js';

export const createChat = async (req, res)=>{
    try {
        const newChat = new chatShema({
            member:[req.body.senderId, req.body.receiverId]
        })
        const result = await newChat.save();
        return res.json({message:'success', result});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const userChats = async (req, res)=>{
    try {
        const chat = chatShema.find({
            member:{$in : [req.params.userId]}
        })
        return res.json({message: 'success', chat})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const findChat = async (req, res)=>{
    try {
        const chat = await chatShema.findOne({
            member:{ $all :[req.params.firstId , req.params.secondId]}
        })
        return res.json({message: 'success', chat})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}