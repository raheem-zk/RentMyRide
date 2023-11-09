import brandSchema from "../../models/carOwner/brand.js";
import categorySchema from "../../models/carOwner/category.js";
import modelSchema from "../../models/carOwner/model.js";
import transmissionSchema from "../../models/carOwner/transmission.js";
import fuelSchema from "../../models/carOwner/fueltype.js";
import districtShema from  '../../models/carOwner/district.js';

export const getCarModels = async (req, res) => {
  try {
    const brand = (await brandSchema.find()) ?? [];
    const category = (await categorySchema.find()) ?? [];
    const model = (await modelSchema.find()) ?? [];
    const transmission = (await transmissionSchema.find()) ?? [];
    const fuelType = (await fuelSchema.find()) ?? [];
    const district = (await districtShema.find()) ?? [];
    return res.json({
      message: "success",
      brand,
      category,
      model,
      transmission,
      fuelType,
      district
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const uppercaseName = name.toUpperCase();
    const existingBrand = await brandSchema.findOne({ name: uppercaseName });

    if (existingBrand) {
      return res.status(401).json({ message: "Brand Name Already Exists" });
    }
    const newBrand = new brandSchema({
      name: uppercaseName,
    });

    const response = await newBrand.save();
    if (response) {
      return res.status(200).json({ message: "Brand added successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const uppercaseName = name.toUpperCase();

    const existingCategory = await categorySchema.findOne({
      name: uppercaseName,
    });
    if (existingCategory) {
      return res.status(401).json({ message: "Category Name Already Exists" });
    }
    const categoryModel = new categorySchema({
      name: uppercaseName,
    });

    const response = await categoryModel.save();
    if (response) {
      return res.status(200).json({ message: "Category added successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addModel = async (req, res) => {
  try {
    const { name } = req.body;
    const uppercaseName = name.toUpperCase();

    const existingCategory = await modelSchema.findOne({ name: uppercaseName });
    if (existingCategory) {
      return res.status(401).json({ message: "Model Name Already Exists" });
    }
    const modelModel = new modelSchema({
      name: uppercaseName,
    });

    const response = await modelModel.save();
    if (response) {
      return res.status(200).json({ message: "Model added successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addFuelType = async (req, res) => {
  try {
    const { name } = req.body;
    const uppercaseName = name.toUpperCase();

    const existingCategory = await fuelSchema.findOne({ name: uppercaseName });
    if (existingCategory) {
      return res.status(401).json({ message: "Fuel-type Name Already Exists" });
    }
    const fuelModel = new fuelSchema({
      name: uppercaseName,
    });

    const response = await fuelModel.save();
    if (response) {
      return res.status(200).json({ message: "Fuel-Type added successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addTransmission = async (req, res) => {
  try {
    const { name } = req.body;
    const uppercaseName = name.toUpperCase();

    const existingCategory = await transmissionSchema.findOne({
      name: uppercaseName,
    });
    if (existingCategory) {
      return res
        .status(401)
        .json({ message: "Transmission Name Already Exists" });
    }
    const transmissionModel = new transmissionSchema({
      name: uppercaseName,
    });

    const response = await transmissionModel.save();
    if (response) {
      return res
        .status(200)
        .json({ message: "Transmission added successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addDistrict = async (req, res) => {
  try {
    const { name } = req.body;
    const uppercaseName = name.toUpperCase();

    const existingCategory = await districtShema.findOne({
      name: uppercaseName,
    });
    if (existingCategory) {
      return res
        .status(401)
        .json({ message: "District Name Already Exists" });
    }
    const districtModel = new districtShema({
      name: uppercaseName,
    });

    const response = await districtModel.save();
    if (response) {
      return res
        .status(200)
        .json({ message: "District added successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
