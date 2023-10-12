import carOwnerSchema from '../../models/carOwner/carOwner.js';
 
export const carOwnersList = async (req, res)=>{
    try {
        const carownersData = await carOwnerSchema.find() ?? [];
        res.json({message:'success',carownersData})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: true });
    }
}

export const ownerBlock = async(req, res)=>{
    try {
        const id = req.params.id;
        console.log(id, ' its heare')
        let result = await carOwnerSchema.updateOne({ _id: id }, { $set: { status: false } });
        if (result.modifiedCount > 0) {
            return res.json({ message: 'Success' });
        }
        return res.status(404).json({ message: 'Car-owner not found', error: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: true });
    }
}

export const ownerUnblock = async (req, res)=>{
    try {
        const id = req.params.id;
        let result = await carOwnerSchema.updateOne({ _id: id }, { $set: { status: true } });
  
        if (result.modifiedCount > 0) {
          return res.json({ message: 'Success' });
        }
        return res.status(404).json({ message: 'Car-owner not found', error: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: true });
    }
}