import express from 'express'
import { signup, login, verifySignup, verifyOtp } from '../controller/carOwner/AuthController.js';
import VerifyToken from '../middleware/jwtCarOwnerVerification.js';
import { addBrand, addCar, addCategory, addFuelType, addModel, addTransmission } from '../controller/carOwner/carSpecController.js';
import upload from '../middleware/multer.js';
import cloudinary from '../utils/cloudinary.js';

// import cloudinary from '../utils/cloudinary.js';
const router = express();

router.post('/login',login)
router.post('/add-brand',addBrand)
router.post('/add-category',addCategory)
router.post('/add-model',addModel)
router.post('/add-fueltype',addFuelType)
router.post('/add-transmission',addTransmission)

router.post('/signup-verify', verifySignup);
router.post('/otp-verification',verifyOtp)
router.post('/signup',upload.array('images', 5),signup);
router.get('/add-car',addCar);


router.get('/test', (req, res) => {
  const htmlForm = `
  <form id="fileUploadForm" enctype="multipart/form-data" method="post" action="/car-owner/test">
  <input type="file" multiple name="image" id="fileInput">
  <button type="submit">Upload</button>
</form>
  `;

  res.send(htmlForm);
});

router.post('/test',upload.single('image'), async (req, res) => {
  try {

    res.status(200).json({ message: "Images uploaded successfully" });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export default router;