import carsSchema from "../../models/carOwner/car.js";
import { filterSloatValidation } from "../../utils/utils.js";
import orderSchema from "../../models/order.js";
import districtShema from "../../models/carOwner/district.js";

const APPROVEL = "Approved";
const AVAILABLE = "Available";
const LIMIT = 12;

export const home = async (req, res) => {
  try {
    const startDate = new Date();
    const endDate = new Date();
    const carsData = await carsSchema
      .find({
        status: APPROVEL,
        ownerStatus: true,
        availability: AVAILABLE,
        startDate: { $lte: startDate },
        endDate: { $gte: endDate },
      })
      .populate("fuelType")
      .populate("transmission")
      .populate("brand")
      .populate("model")
      .populate("category")
      .populate("district")
      .sort({ _id: -1 })
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
    const PAGE = req?.query?.page
      ? req.query.page >= 1
        ? req.query.page
        : 1
      : 1;
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

    let startDate;
    let endDate;

    if (req.query.startDate && req.query.endDate) {
      startDate = new Date(req.query.startDate);
      endDate = new Date(req.query.endDate);
    } else {
      startDate = new Date();
      endDate = new Date();
    }
    const sortOrder = req?.query?.sortOrder === "highToLow" ? -1 : 1;

    const filteredData = await carsSchema
      .find({
        $and: [
          filter,
          { startDate: { $lte: startDate } },
          { endDate: { $gte: endDate } },
        ],
      })
      .populate("fuelType")
      .populate("transmission")
      .populate("brand")
      .populate("model")
      .populate("category")
      .populate("district")
      .sort({ perDayPrice: sortOrder })
      .skip(SKIP)
      .limit(LIMIT);

    if (req.query.startDate && req.query.endDate) {
      const orderData = await orderSchema
        .find({ paymentStatus: "Paid", status: "approved" })
        .sort({ _id: -1 });

      if (orderData.length !== 0) {
        startDate = new Date(req.query.startDate);
        endDate = new Date(req.query.endDate);

        const copyOfFilterData = [...filteredData];

        filteredData.forEach((car, index) => {
          const isConflict = filterSloatValidation(
            startDate,
            endDate,
            orderData,
            car
          );
          if (isConflict) {
            copyOfFilterData.splice(index, 1);
          }
        });

        return res.json({
          message: "success",
          filteredData: copyOfFilterData,
          size: 1,
        });
      }
    }

    const TotalSize = await carsSchema.countDocuments(filter);
    const size = Math.ceil(TotalSize / LIMIT);
    return res.json({ message: "success", filteredData, size });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const district = async (req, res) => {
  try {
    const result = (await districtShema.find()) ?? [];
    return res.json({ message: "success", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
