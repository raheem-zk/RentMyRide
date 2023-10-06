import userModel from '../../models/user.js';

export const userList = async (req,res)=>{
    try {
        const userData = await userModel.find();
        res.json({userData})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: true });
    }
}

export const userUnblock = async (req, res) => {
    try {
      const id = req.params.id;
      let result = await userModel.updateOne({ _id: id }, { $set: { status: true } });

      if (result.modifiedCount > 0) {
        return res.json({ message: 'Success' });
      }
      return res.status(404).json({ message: 'User not found', error: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error', error: true });
    }
  };
  
export const userBlock = async (req, res) => {
    try {
      const id = req.params.id;
      let result = await userModel.updateOne({ _id: id }, { $set: { status: false } });
      if (result.modifiedCount > 0) {
        return res.json({ message: 'Success' });
      }
      return res.status(404).json({ message: 'User not found', error: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error', error: true });
    }
  };
  