import brandSchema from "../../models/carOwner/brand.js";
import categorySchema  from '../../models/carOwner/category.js'
import modelSchema from '../../models/carOwner/model.js';
import transmissionSchema from '../../models/carOwner/transmission.js';
import fuelSchema from '../../models/carOwner/fueltype.js';

export const addCar = async (req,res)=>{
    try {
        const brand = await brandSchema.find() ?? [];
        const category = await categorySchema.find() ?? [];
        const model = await modelSchema.find() ?? [];
        const transmission = await transmissionSchema.find() ?? [];
        const fueltype = await fuelSchema.find() ?? [];
        return res.json({message:'success', brand ,category, model, transmission, fueltype })
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

        const existingCategory = await categorySchema.findOne({name:uppercaseName});
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

export const addModel = async (req, res)=>{
    try {
        const { name } = req.body;
        const uppercaseName = name.toUpperCase();

        const existingCategory = await modelSchema.findOne({name:uppercaseName});
        if (existingCategory) {
            return res.status(401).json({ message: 'Model Name Already Exists' });
        }
        const modelModel = new modelSchema({
            name:uppercaseName
        })

        modelModel.save();
        return res.status(200).json({ message: 'Model added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const addFuelType = async (req, res)=>{
    try {
        const { name } = req.body;
        const uppercaseName = name.toUpperCase();

        const existingCategory = await fuelSchema.findOne({name:uppercaseName});
        if (existingCategory) {
            return res.status(401).json({ message: 'Fuel-type Name Already Exists' });
        }
        const fuelModel = new fuelSchema({
            name:uppercaseName
        })

        fuelModel.save();
        return res.status(200).json({ message: 'Fuel-Type added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const addTransmission = async (req, res)=>{
    try {
        const { name } = req.body;
        const uppercaseName = name.toUpperCase();

        const existingCategory = await transmissionSchema.findOne({name:uppercaseName});
        if (existingCategory) {
            return res.status(401).json({ message: 'Transmission Name Already Exists' });
        }
        const transmissionModel = new transmissionSchema({
            name:uppercaseName
        })

        transmissionModel.save();
        return res.status(200).json({ message: 'Transmission added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}