import express from "express";
import { login } from "../controller/admin/authController.js";
import {
  userList,
  userBlock,
  userUnblock,
} from "../controller/admin/usersController.js";
import VerifyToken from "../middleware/jwtAdminVerification.js";
import {
  carApproved,
  carList,
  carRejected,
} from "../controller/admin/carsController.js";
import {
  carOwnersList,
  ownerBlock,
  ownerUnblock,
} from "../controller/admin/carOwnersController.js";
import { dashboard, getOrders } from "../controller/admin/controller.js";
import {
  getCategory,
  updateCategoryName,
  updateCategoryStatus,
} from "../controller/admin/categoryController.js";
import {
  getBrand,
  updateBrandName,
  updateBrandStatus,
} from "../controller/admin/brandController.js";
import { getDistrict, updateDistrictName, updateDistrictStatus } from "../controller/admin/districtController.js";

const router = express();

router.post("/login", login);

router.get("/dashboard", VerifyToken, dashboard);

// users
router.get("/users", VerifyToken, userList);
router.patch("/users/:id/unblock", VerifyToken, userUnblock);
router.patch("/users/:id/block", VerifyToken, userBlock);

// cars
router.get("/cars", VerifyToken, carList);
router.patch("/cars/:id/approve/", VerifyToken, carApproved);
router.patch("/cars/:id/reject/:message", VerifyToken, carRejected);

// car owners
router.get("/car-owners", VerifyToken, carOwnersList);
router.patch("/car-owners/:id/unblock", VerifyToken, ownerUnblock);
router.patch("/car-owners/:id/block", VerifyToken, ownerBlock);

// orders
router.get("/orders", VerifyToken, getOrders);

// category
router.get("/category", VerifyToken, getCategory);
router.patch("/updateCategory", VerifyToken, updateCategoryName);
router.patch("/updateCategoryStatus", VerifyToken, updateCategoryStatus);

// brand
router.get("/brandh", VerifyToken, getBrand);
router.path("/updateBrand", VerifyToken, updateBrandName);
router.path("/updateBrandStatus", VerifyToken, updateBrandStatus);

// district
router.get("/district", VerifyToken, getDistrict);
router.path("/updateDistrict", VerifyToken, updateDistrictName);
router.path("/updateDistrictStatus", VerifyToken, updateDistrictStatus);

export default router;
