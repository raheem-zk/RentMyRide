import carsSchema from "../../models/carOwner/car.js";

const APPROVEL = "Approved";
const AVAILABLE = "Available";
const LIMIT = 10;

export const home = async (req, res) => {
  try {
    const carsData = await carsSchema
      .find({ status: APPROVEL, ownerStatus: true })
      .populate("fuelType")
      .populate("transmission")
      .populate("brand")
      .populate("model")
      .populate("category")
      .limit(LIMIT);
    return res.json({ message: "success", carsData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const filterData = async (req, res) => {
  try {
    const filter = {};
    console.log(LIMIT);
    const PAGE = req?.query?.page || 1;
    const SKIP = (PAGE - 1) * LIMIT;

    filter.ownerStatus = true;
    filter.availability = AVAILABLE;
    filter.status = APPROVEL;

    const searchText = req?.query?.searchText;

    if (req?.query?.searchText) {
      filter.carName = { $regex: searchText, $options: "i" };
    }
    if (req?.query?.category) {
      filter.category = req?.query?.category;
    }

    if (req?.query?.brand) {
      filter.brand = req?.query?.brand;
    }

    if (req?.query?.model) {
      filter.model = req?.query?.model;
    }

    if (req?.query?.fuelType) {
      filter.fuelType = req?.query?.fuelType;
    }

    if (req?.query?.transmission) {
      filter.transmission = req?.query?.transmission;
    }

    const filteredData = await carsSchema
      .find(filter)
      .populate("fuelType")
      .populate("transmission")
      .populate("brand")
      .populate("model")
      .populate("category")
      .skip(SKIP)
      .limit(LIMIT);

    return res.json({ message: "success", filteredData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
