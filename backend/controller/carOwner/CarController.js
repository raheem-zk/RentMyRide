import brandSchema from "../../models/carOwner/brand.js";
import categorySchema  from '../../models/carOwner/category.js'

export const addCar = async (req,res)=>{
    try {
        const brand = await brandSchema.find() ?? [];
        res.json({message:'success', brand })
    } catch (error) {
        console.log(error);
    }
}


export const addBrand = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(name);
        const uppercaseName = name.toUpperCase();
        const existingBrand = await brandSchema.findOne({name: uppercaseName });

        if (existingBrand) {
            return res.status(401).json({ message: 'Brand Name Already Exists' });
        }
        const newBrand = new brandSchema({
            name:uppercaseName,
        });

        await newBrand.save();

        return res.status(200).json({ message: 'Brand added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const addCategory = async (req, res)=>{
    try {
        const { name } = req.body;
        const uppercaseName = name.toUpperCase();

        const existingCategory = await categorySchema.findOne({name:categorySchema});
        if (existingCategory) {
            return res.status(401).json({ message: 'Category Name Already Exists' });
        }
        const categoryModel = new categorySchema({
            name:uppercaseName
        })

        categoryModel.save();
        return res.status(200).json({ message: 'Category added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
