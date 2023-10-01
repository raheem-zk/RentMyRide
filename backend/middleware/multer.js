import multer from 'multer';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path'; // Use dirname instead of __dirname

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // Use dirname to get the directory name

// multer handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, '../public/images')); // Use join for the destination path
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

export default upload;